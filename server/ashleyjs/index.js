var nlp = require("nlp_compromise");
var R = require('./src/recurrent.js');
var Rvis = require('./src/vis.js');
var fs = require('fs');
var natural = require('natural');
var moment = require('moment');
var request = require('request');
var wiki = require('node-wikipedia');
var htmlToText = require("html-to-text");
var cheerio = require('cheerio');

// Model parameters 
var sample_softmax_temperature = Math.pow(10, 0.5); // how peaky model predictions should be
// var sample_softmax_temperature = 1.0;
var generator = 'lstm'; // can also be rnn
var max_chars_gen = 200; // max length of generated sentences
var epoch_size = -1;
var input_size = -1;
var output_size = -1;
var letter_size = 5;
var hidden_layers = 3;
// TODO: change this variables to one number
var hidden_sizes = [64,64,64]; // list of sizes of hidden layers
var regc = 0.000001; // L2 regularization strength
var learning_rate = 0.01; // learning rate
var clipval = 5.0;
// output params
var total = ''; 
var totalSample = '';

// Global variables
var letterToIndex = {};
var indexToLetter = {};
var vocab = [];
var trainingSet = '';
var solver = new R.Solver(); // should be class because it needs memory for step caches
var pplGraph = new Rvis.Graph();

var model = {};
var tokenizer = new natural.RegexpTokenizer({pattern: /( |\w+|\!|\'|\"|\n)/i});

var initVocab = function(sents, count_threshold) {
  // go over all words and keep track of all unique ones seen
  // join all the sentences
 
  var tokens = tokenizer.tokenize(sents);
  // count up all words
  var wordCount = {};
  // special chars, also considered as words 
  for(var i=0,n=tokens.length;i<n;i++) {
    var txti = tokens[i];
    if(txti in wordCount) { wordCount[txti] += 1; } 
    else { wordCount[txti] = 1; }
  }
  // filter by count threshold and create pointers
  // NOTE: start at one because we will have START and END tokens!
  // that is, START token will be index 0 in model letter vectors
  // and END token will be index 0 in the next character softmax
  var q = 1; 
  for(word in wordCount) {
    if(wordCount[word] >= count_threshold) {
      // add character to vocab
      letterToIndex[word] = q;
      indexToLetter[q] = word;
      vocab.push(word);
      q++;
    }
  }
  input_size = vocab.length + 1;
  output_size = vocab.length + 1;
  epoch_size = sents.length;
}

var utilAddToModel = function(modelto, modelfrom) {
  for(var k in modelfrom) {
    if(modelfrom.hasOwnProperty(k)) {
      // copy over the pointer but change the key to use the append
      modelto[k] = modelfrom[k];
    }
  }
};

var initModel = function() {
  // letter embedding vectors
  var model = {};
  model['Wil'] = new R.RandMat(input_size, letter_size , 0, 0.08);
  
  if(generator === 'rnn') {
    var rnn = R.initRNN(letter_size, hidden_sizes, output_size);
    utilAddToModel(model, rnn);
  } else {
    var lstm = R.initLSTM(letter_size, hidden_sizes, output_size);
    utilAddToModel(model, lstm);
  }

  return model;
};

var reinit = function() {
  // note: reinit writes global vars
  solver = new R.Solver(); // reinit solver
  pplGraph = new Rvis.Graph();

  ppl_list = [];
  tick_iter = 0;
  // read in txt file 
  trainingSet = fs.readFileSync(__dirname + '/shakespeare.txt', 'utf8');

  // check if there is a jsonfile 
  fs.stat(__dirname + '/output/load.txt', function(err, result) {
    if(err) {
      console.log('creating new model');
      initVocab(trainingSet, 1); // takes count threshold for characters
      model = initModel();
      setInterval(tick, 1000);
    } else {
      console.log('loading model');
      model = JSON.parse(fs.readFileSync(__dirname + '/output/load.txt'));
      loadModel(model);
      setInterval(tick, 1000);
    }
  }); 
}

var saveModel = function() {
  var out = {};
  out['hidden_sizes'] = hidden_sizes;
  out['generator'] = generator;
  out['letter_size'] = letter_size;
  var model_out = {};
  for(var k in model) {
    if(model.hasOwnProperty(k)) {
      model_out[k] = model[k].toJSON();
    }
  }
  out['model'] = model_out;
  var solver_out = {};
  solver_out['decay_rate'] = solver.decay_rate;
  solver_out['smooth_eps'] = solver.smooth_eps;
  step_cache_out = {};
  for(var k in solver.step_cache) {
    if(solver.step_cache.hasOwnProperty(k)) {
      step_cache_out[k] = solver.step_cache[k].toJSON();
    }
  }
  solver_out['step_cache'] = step_cache_out;
  out['solver'] = solver_out;
  out['letterToIndex'] = letterToIndex;
  out['indexToLetter'] = indexToLetter;
  out['vocab'] = vocab;
  fs.writeFileSync(__dirname + '/output/model.txt', JSON.stringify(out), 'utf8');
}

var loadModel = function(j) {
  hidden_sizes = j.hidden_sizes;
  generator = j.generator;
  letter_size = j.letter_size;
  model = {};
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
  if(generator === 'rnn') {
    var out_struct = R.forwardRNN(G, model, hidden_sizes, x, prev);
  } else {
    var out_struct = R.forwardLSTM(G, model, hidden_sizes, x, prev);
  }
  return out_struct;
}

var predictSentence = function(model, samplei, temperature, seed) {
  if(typeof samplei === 'undefined') { samplei = false; }
  if(typeof temperature === 'undefined') { temperature = 1.0; }
  var G = new R.Graph(false);
  var s = seed + ' ' || '';
  var prev = {};
  while(s.length < max_chars_gen) {
    var tokens = tokenizer.tokenize(s);
    var ix = (s.length === 0 || letterToIndex[tokens[tokens.length - 1]] === undefined) ? 0 : letterToIndex[tokens[tokens.length - 1]];
    var lh = forwardIndex(G, model, ix, prev);
    prev = lh;

    // sample predicted letter
    logprobs = lh.o;
    if(temperature !== 1.0 && samplei) {
      // scale log probabilities by temperature and renormalize
      // if temperature is high, logprobs will go towards zero
      // and the softmax outputs will be more diffuse. if temperature is
      // very low, the softmax outputs will be more peaky
      for(var q=0,nq=logprobs.w.length;q<nq;q++) {
        logprobs.w[q] /= temperature;
      }
    }

    probs = R.softmax(logprobs);
    if(samplei) {
      var ix = R.samplei(probs.w);
    } else {
      var ix = R.maxi(probs.w);  
    }
    
    if(ix === 0) continue; // END token predicted, break out
    var letter = indexToLetter[ix];
    s += letter + ' ';
  }
  return s;
};

var costfun = function(model, sent) {
  // takes a model and a sentence and
  // calculates the loss. Also returns the Graph
  // object which can be used to do backprop
  // adjust constfunc for words 
  var tokens = tokenizer.tokenize(sent);
  var n = tokens.length;
  var G = new R.Graph();
  var log2ppl = 0.0;
  var cost = 0.0;
  var prev = {};
  for(var i=-1; i<n; i++) {
    // start and end tokens are zeros
    var ix_source = i === -1 ? 0 : letterToIndex[tokens[i]]; // first step: start with START token
    var ix_target = i === n-1 ? 0 : letterToIndex[tokens[i+1]]; // last step: end with END token
    lh = forwardIndex(G, model, ix_source, prev);
    prev = lh;

    // set gradients into logprobabilities
    logprobs = lh.o; // interpret output as logprobs
    probs = R.softmax(logprobs); // compute the softmax probabilities

    log2ppl += -Math.log2(probs.w[ix_target]); // accumulate base 2 log prob and do smoothing
    cost += -Math.log(probs.w[ix_target]);

    // write gradients into log probabilities
    logprobs.dw = probs.w;
    logprobs.dw[ix_target] -= 1;
  }
  var ppl = Math.pow(2, log2ppl / (n - 1));
  return {'G':G, 'ppl':ppl, 'cost':cost};
}

function median(values) {
  values.sort( function(a,b) {return a - b;} );
  var half = Math.floor(values.length/2);
  if(values.length % 2) return values[half];
  else return (values[half-1] + values[half]) / 2.0;
};

var ppl_list = [];
var tick_iter = 0;

var tick = function() {

  // sample sentence from data
  // split out trainingSet on \n
  var lines = trainingSet.split('\n');
  var sentix = R.randi(0,lines.length);
  // select random sentence 
  // add newline at end
  var sent = lines[sentix + 1] === '' ? lines[sentix] + '\n\n' : lines[sentix] + '\n';

  var t0 = +new Date();  // log start timestamp
  // evaluate cost function on a sentence
  var cost_struct = costfun(model, sent);
  
  // use built up graph to compute backprop (set .dw fields in mats)
  cost_struct.G.backward();
  // perform param update
  var solver_stats = solver.step(model, learning_rate, regc, clipval);
};

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
    if (key.length < 5 || rawWordList[key] < threshold || searchWords.indexOf(key.toLowerCase()) !== -1){
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
    picture: ''
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
  tick();
};

var getPoem = function (type, searchTerm, cb) {
  // make ajax request
  var text = '', plain = '', entities = [], data = {};
  wiki.page.data(searchTerm, { content: true }, function(response) {
    // convert html to text for nlp processing
    if (!response) {
      var errorMsg = 'Sorry, our poet was uninspired by your search term. Please try again.';
      // console.log(errorMsg);
      cb(errorMsg);
    } else {
      text = htmlToText.fromString(response.text['*']);
      data.headers = getHeaders(searchTerm);
    }
    // get keywords from wikipedia page
    wikiKeywords = getWikiKeywords(text, searchTerm);
    // load model of requested type
    loadType(type); 
    // ask Ashley for a sentence
    var poemDraft1 = predictSentence(model, true, 2.5, searchTerm);

    poemKeywords = getPoemKeywords(poemDraft1, searchTerm);
    // console.log('poem draft 1: ', poemDraft1);
    // console.log('--------------------------');

    var wikiPoem = insertKeywords(poemDraft1, searchTerm, poemKeywords, wikiKeywords);
    cb(wikiPoem);
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

      // var log = 'replaced ' + poemWord + ' with ' + wikiWord + ' !';
      // console.log(log);
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

  // console.log('--------------------------');
  // console.log('wikified poem: ', finalPoem);
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
