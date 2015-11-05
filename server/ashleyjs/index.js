var nlp = require('nlp_compromise');
var R = require('./src/recurrent.js');
var Rvis = require('./src/vis.js');
var fs = require('fs');
var natural = require('natural');
var moment = require('moment');
var request = require('request');
var wiki = require('node-wikipedia');
var htmlToText = require('html-to-text');
var cheerio = require('cheerio');

// Model parameters 
var sample_softmax_temperature = 0.4; // how peaky model predictions should be
var generator = 'lstm'; // can also be rnn
var max_chars_gen = 200; // max length of generated sentences
var letter_size = 5;

// Global variables
var letterToIndex = {};
var indexToLetter = {};
var vocab = [];
var trainingSet = '';
var solver = new R.Solver(); // should be class because it needs memory for step caches

var model = {};

var loadModel = function(j) {
  hidden_sizes = j.hidden_sizes;
  generator = j.generator;
  letter_size = j.letter_size;
  // model = {};
  for(var k in j.model) {
    if(j.model.hasOwnProperty(k)) {
      var matjson = j.model[k];
      model[k] = new R.Mat(1,1);
      model[k].fromJSON(matjson);
    }
  }
  solver = new R.Solver(); // have to reinit the solver since model changed
  solver.decay_rate = j.solver.decay_rate;
  solver.smooth_eps = j.solver.smooth_eps;
  solver.step_cache = {};
  for(var k in j.solver.step_cache){
      if(j.solver.step_cache.hasOwnProperty(k)){
          var matjson = j.solver.step_cache[k];
          solver.step_cache[k] = new R.Mat(1,1);
          solver.step_cache[k].fromJSON(matjson);
      }
  }
  letterToIndex = j['letterToIndex'];
  indexToLetter = j['indexToLetter'];
  vocab = j['vocab'];
  // reinit these
  ppl_list = [];
  tick_iter = 0;
}

var forwardIndex = function(G, model, ix, prev) {
  var x = G.rowPluck(model['Wil'], ix);
  // forward prop the sequence learner
  var out_struct = R.forwardLSTM(G, model, hidden_sizes, x, prev);
  return out_struct;
}

var predictSentence = function(model, samplei, temperature, seed) {
  if(typeof samplei === 'undefined') { samplei = false; }
  if(typeof temperature === 'undefined') { temperature = 0.4; }
  if(seed === undefined) { seed = ''};
  var G = new R.Graph(false);
  var s = seed + ' ' || '';
  var prev = {};
  while(s.length < max_chars_gen) {
    var ix = (s.length === 0 || letterToIndex[s[s.length - 1]] === undefined) ? 0 : letterToIndex[s[s.length - 1]];
   
    var lh = forwardIndex(G, model, ix, prev);
    prev = lh;

    // sample predicted letter
    var logprobs = lh.o;
    if(temperature !== 1.0 && samplei) {
      // scale log probabilities by temperature and renormalize
      // if temperature is high, logprobs will go towards zero
      // and the softmax outputs will be more diffuse. if temperature is
      // very low, the softmax outputs will be more peaky
      for(var q=0,nq=logprobs.w.length;q<nq;q++) {
        logprobs.w[q] /= temperature;
      }
    }

    var probs = R.softmax(logprobs);

    if(samplei) {
      var ix = R.samplei(probs.w);
    } else {
      var ix = R.maxi(probs.w);  
    }
    
    if(ix === 0) break; // END token predicted, break out
    var letter = indexToLetter[ix];
    s += letter;
  }
  return s;
};

var costfun = function(model, sent) {
  // takes a model and a sentence and
  // calculates the loss. Also returns the Graph
  // object which can be used to do backprop
  // adjust constfunc for words 
  // var tokens = tokenizer.tokenize(sent);
  var n = sent.length;
  var G = new R.Graph();
  var log2ppl = 0.0;
  var cost = 0.0;
  var prev = {};
  for(var i=-1; i<n; i++) {
    // start and end tokens are zeros
    var ix_source = i === -1 ? 0 : letterToIndex[sent[i]]; // first step: start with START token
    var ix_target = i === n-1 ? 0 : letterToIndex[sent[i+1]]; // last step: end with END token
    lh = forwardIndex(G, model, ix_source, prev);
    prev = lh;

    // set gradients into logprobabilities
    var logprobs = lh.o; // interpret output as logprobs
    var probs = R.softmax(logprobs); // compute the softmax probabilities

    log2ppl += -Math.log2(probs.w[ix_target]); // accumulate base 2 log prob and do smoothing
    cost += -Math.log(probs.w[ix_target]);

    // write gradients into log probabilities
    logprobs.dw = probs.w;
    logprobs.dw[ix_target] -= 1;
  }
  var ppl = Math.pow(2, log2ppl / (n - 1));
  return {'G':G, 'ppl':ppl, 'cost':cost};
}

//condense Wikipedia article for entered text into keywords
var getWikiKeywords = function(text, searchTerm) {
  var rawWordList = {};
  var categorizedWords = {
    nouns: [],
    adjectives: [],
    verbs: [],
    random: []
  };
  var articleLength = Math.floor(text.length);
  //adjust threshold for a word to count as significant based on article length 
  if(articleLength < 50000) {
    threshold = 2;
  } else {
    threshold = 3 + Math.floor(articleLength/100000); //100k ->4 200k ->5 300k -> 6
  }
  //only scan first 10% of article
  var words = nlp.tokenize(text.slice(0, text.length/10));

  //compile words and count occurrences
  for(var i = 0; i < words.length; i++){
    for(var j = 0; j < words[i].tokens.length; j++){
      if(words[i].tokens[j].text[0]!=='[' && words[i].tokens[j].text[0]!=='*'){
        if(rawWordList.hasOwnProperty(words[i].tokens[j].text)){
          rawWordList[words[i].tokens[j].text]++;
        } else {
          rawWordList[words[i].tokens[j].text] = 1;
        }
      }
    }
  }

  var byFrequency = [];
  //helper function
  var swap = function(array, i, j){
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  var searchLower = searchTerm.toLowerCase();
  var searchWords = searchTerm.split(' ');
  for(var key in rawWordList){
    //delete filler words and rare words
    if (key.length < 5 || rawWordList[key] < threshold || searchWords.indexOf(key.toLowerCase()) !== -1 || key.indexOf('disambiguation') !== -1 || key.indexOf('article') !== -1){
      delete rawWordList[key];
    } else {
      //sort by frequency
      byFrequency.push(key);
      for(var i = 0; i < byFrequency.length-1; i++){
        while(rawWordList[byFrequency[i]] < rawWordList[byFrequency[i+1]]){
          swap(byFrequency, i, i+1);
        }
      }
    }
  }

  //categorize parts of speech
  for(var i = 0; i < byFrequency.length; i++) {
    var s = nlp.pos(byFrequency[i]);
    if (s.verbs()[0]){
      categorizedWords['verbs'].push(s.verbs()[0].text);
    } else if (s.nouns()[0]){
      categorizedWords['nouns'].push(s.nouns()[0].text);
    } else if (s.adjectives()[0]){
      categorizedWords['adjectives'].push(s.adjectives()[0].text);
    } else {
      categorizedWords['random'].push(byFrequency[i]);
    }
  }
  return categorizedWords;
};

var getPicture = function(cb) {
  var image = $(".infobox img").attr('src') || $(".thumb.tright .thumbinner a img").attr('src') || $("tr td a img").attr('src');
  image = image || '//upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/250px-Shakespeare.jpg';
  cb(image.slice(2));
}

var getHeaders = function(cb) {
  // get first 3 subheadings from wikipedia page 
  var headers = [];
  $('.toc ul li').slice(0, 3).each(function() {
    headers.push($(this).children().not('ul').find('.toctext').text());
  });
  cb(headers);
};

var getArticle = function(searchTerm, cb) {
  // get picture and 3 subheadings of article 
  var article = {
    headings: [],
    picture: '',
    pictureCaption: predictSentence(model, true, sample_softmax_temperature, searchTerm)
  };
  wiki.page.data(searchTerm, {content: true}, function(response) {
    $ = cheerio.load(response.text['*']);
    getHeaders(function(headings) {
      article.headings = headings;
      getPicture(function(picture) {
        article.picture = picture;
        cb(article);
      });
    });
  });
};

var getHomePageSection = function(divTag) {
  var texts = [], section = 'table#mp-upper div';
  $(section + divTag).first().children().each(function() {
    texts.push($(this).text());
  });
  return texts;
};

var getHomePageLinks = function(divTag) {
  var links = [], section = 'b a';
  $(divTag).first().children().each(function() {
    links.push($(this).find(section).text());
  });
  return links;
};

var getHomePagePictures = function(divTag) {
  var section = '-img a img';
  return $(divTag + ' ' + divTag + section).attr('src').slice(2);
};

var getHomePage = function(callback) {
  var homepage = {
    featured: {
      link: '',
      text: '',
      picture: ''
    },
    news: {
      link: [],
      text: [],
      picture: [],
      tag: '#mp-itn'
    },
    day: {
      link: [],
      text: [],
      picture: '',
      tag: '#mp-otd'
    },
    know: {
      link: [],
      text: [],
      picture: '',
      tag: '#mp-dyk'
    }
  };
  // get info from the real homepage
  wiki.page.data('Main Page', {content: true}, function (response) {
    $ = cheerio.load(response.text['*']);
    // get link and picture for featured article 
    homepage.featured.link = $('#mp-tfa b a').attr('title');
    homepage.featured.picture = getHomePagePictures('#mp-tfa');

    for(var section in homepage) {
      // get link, text and picture for 'in the news', 'on this day' and 'did you know'
      if(section !== 'featured') {
        homepage[section].link = getHomePageLinks(homepage[section].tag + ' ul')
        homepage[section].text = getHomePageSection(homepage[section].tag + ' ul');
        homepage[section].picture = getHomePagePictures(homepage[section].tag);
      }
    }
    // return homepage object
    callback(homepage);
  });
};

var loadType = function (type) {
  // get correct model from output folder
  var modelRaw = JSON.parse(fs.readFileSync(__dirname + '/output/' + type + '.txt', 'utf8'));
  loadModel(modelRaw);
};


var getPoem = function (type, searchTerm, cb) {
  var poemInfo = {
    replaced: [],
    poem: ''
  }
  // make ajax request
  var text = '', plain = '', entities = [], data = {};
  wiki.page.data(searchTerm, { content: true }, function(response) {
    // convert html to text for nlp processing
    if (!response) {
      var errorMsg = 'Sorry, our poet was uninspired by your search term. Please try again.';
      poemInfo.poem = errorMsg;
      cb(poemInfo);
    } else {
      text = htmlToText.fromString(response.text['*']);
      // data.headers = getHeaders(searchTerm, function());
    }
    // get keywords from wikipedia page
    wikiKeywords = getWikiKeywords(text, searchTerm);
    // load model of requested type
    loadType(type); 
    // ask Ashley for a sentence
    var poemDraft1 = '';
    for (var i = 0; i < 5; i++) {
      if (i === 0) {//seed model with search term
        poemDraft1 += predictSentence(model, true, sample_softmax_temperature, searchTerm);
      } else {
        poemDraft1 += predictSentence(model, true, sample_softmax_temperature);
      }
      
    }
    poemKeywords = getPoemKeywords(poemDraft1, searchTerm);
    //replace poem keywords with wiki keywords
    var wikiPoem = insertKeywords(poemDraft1, searchTerm, poemKeywords, wikiKeywords);
    //keep record of replaced words
    for (var pos in wikiKeywords) {
      for (var i = 0; i < wikiKeywords[pos].length; i++) {
        if (wikiPoem.indexOf(wikiKeywords[pos][i]) !== -1){
          poemInfo.replaced.push(wikiKeywords[pos][i]);
        }
      }
    }
    poemInfo.poem = wikiPoem;
    cb(poemInfo);
  });
};


//helper function to randomly replace words according part of speech
var replacePoemWordsByPOS = function(poem, numReplace, poemWordsArray, wikiWordsArray){
  var newPoem = poem;
  if(numReplace === 0) {
    return poem;
  } else {
    for (var i = 0; i < numReplace; i++) {
      var randPoemIndex = Math.floor(Math.random()*poemWordsArray.length);
      var randWikiIndex = Math.floor(Math.random()*wikiWordsArray.length);
      var poemWord = poemWordsArray[randPoemIndex];
      var wikiWord = wikiWordsArray[randWikiIndex];

      if (poem.indexOf(poemWord) !== -1){
        var newPoem = newPoem.replace(poemWord, wikiWord);
      }
    }
    return newPoem;
  }
};

var getPoemKeywords = function(poem, searchTerm) {
  var categorizedWords = {
    nouns: [],
    adjectives: [],
    verbs: []
  };
 
  var wordList = [];

  //remove first word/search term
  var cutPoem = poem.slice(searchTerm.length);
 
  //split poem into words
  var words = nlp.tokenize(cutPoem);

  for(var i = 0; i < words.length; i++){
    for(var j = 0; j < words[i].tokens.length; j++){
      wordList.push(words[i].tokens[j].text);
    }
  }

  //categorize poem words
  for (var i = 0; i < wordList.length; i++) {
    var s = nlp.pos(wordList[i]);
   
    if (s.nouns()[0]) {
      categorizedWords['nouns'].push(s.nouns()[0].text);
    } else if (s.adjectives()[0]) {
      categorizedWords['adjectives'].push(s.adjectives()[0].text);
    } else if (s.verbs()[0]) {
      categorizedWords['verbs'].push(s.verbs()[0].text);
    }
  }
  return categorizedWords;
};

var insertKeywords = function(poem, searchTerm, poemKeywordObj, wikiKeywordObj) {
  //remove first word from generated poem (which equals search term)
  var restOfPoem = poem.slice(searchTerm.length);

  //choose number of words to replace based on poem and wiki keyword counts
  var numNounsReplace = Math.floor(Math.min(poemKeywordObj['nouns'].length/3, wikiKeywordObj['nouns'].length/3));
  var numAdjsReplace = Math.floor(Math.min(poemKeywordObj['adjectives'].length/2, wikiKeywordObj['adjectives'].length/2));
  var numVerbsReplace = Math.floor(Math.min(poemKeywordObj['verbs'].length/4, wikiKeywordObj['verbs'].length/4));

  //insert 
  var nounsSwapped = replacePoemWordsByPOS(restOfPoem, numNounsReplace, poemKeywordObj['nouns'], wikiKeywordObj['nouns']) || restOfPoem;
  var adjsSwapped = replacePoemWordsByPOS(nounsSwapped, numAdjsReplace, poemKeywordObj['adjectives'], wikiKeywordObj['adjectives']) || nounsSwapped;
  var verbsSwapped = replacePoemWordsByPOS(adjsSwapped, numVerbsReplace, poemKeywordObj['verbs'], wikiKeywordObj['verbs']) || adjsSwapped;

  //remove first word
  var finalPoem = replacePoemWordsByPOS(verbsSwapped, 1, poemKeywordObj['nouns'], [searchTerm]) || verbsSwapped;

  return finalPoem;
};

exports.getPoem = getPoem;
exports.getHomePage = getHomePage;
exports.getPicture = getPicture;
exports.getHeaders = getHeaders;
exports.getArticle = getArticle;
exports.getWikiKeywords = getWikiKeywords;
exports.getPoemKeywords = getPoemKeywords;
exports.replacePoemWords = replacePoemWordsByPOS;
exports.insertKeywords = insertKeywords;
