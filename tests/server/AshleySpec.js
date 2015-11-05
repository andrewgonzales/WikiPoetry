var expect = require('chai').expect;
var wiki = require('node-wikipedia');
var cheerio = require('cheerio');
var should = require('chai').should;
var assert = require('chai').assert;
var ashley = require('../../server/ashleyjs/index.js');

describe('getArticle function', function () {
  
  xit('should get main picture from a wikipedia page about a person', function(done) {
    ashley.getArticle('Eddy Merckx', function(result) {
      expect(result.picture).to.equal('upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Eddy_Merckx_Molteni_1973.jpg/220px-Eddy_Merckx_Molteni_1973.jpg');
      done();
    });
  });
  
  xit('should get main picture from a wikipedia page about a general subject', function (done) {
    
    ashley.getArticle('Love', function (result) {
      expect(result.picture).to.equal('upload.wikimedia.org/wikipedia/commons/thumb/a/a3/DickseeRomeoandJuliet.jpg/220px-DickseeRomeoandJuliet.jpg');
      done();
    });
  });

  xit('should get first 3 headers of a wiki page', function (done) {
    ashley.getArticle('Love', function (result) {
      expect(result.headings).to.eql(['Definitions', 'Impersonal love', 'Interpersonal love']);
      done();
    });
  });
});

describe('getHomepage function', function () {

  xit('should have a featured key with all necessary attributes', function(done) {
    ashley.getHomePage(function (result) {
      var linkLength = result.featured.link.length;
      var pictureLength = result.featured.picture.length;
      expect(linkLength).to.be.above(0);
      expect(pictureLength).to.be.above(0);
      done();
    });
  });

  it('Should have an equal amount of texts and links for "in the news", "on this day" and "did you know"', function(done) {
    ashley.getHomePage(function (result) {
      for (var section in result) {
        if (section !== 'featured') {
          expect(result[section].link.length).to.equal(result[section].text.length);
        }
      }
      done();
    });
  });
});

describe('Wikipedia Homepage consistency', function () {

  it('should have the "#mp-tfa b a" element', function(done) {
    wiki.page.data('Main Page', {content: true}, function (response) {
      $ = cheerio.load(response.text['*']);
      expect($('#mp-tfa b a').attr('title')).to.be.a('string');
      done();
    });
  });

  it('should have the "#mp-itn ul" element', function(done) {
    wiki.page.data('Main Page', {content: true}, function (response) {
      expect($('#mp-itn ul').children().length).to.be.above(0);
      done();
    });
  });
});

describe('Keyword Tests', function () {

  describe('getWikiKeywords', function () {
    var searchTerm = 'Barack Obama';
    var wikiText = 'Barack Hussein Obama II (US Listeni/bəˈrɑːk huːˈseɪn ɵˈbɑːmə/; born August 4, 1961) is the 44th and current President of the United States, and the first African American to hold the office. Born in Honolulu, Hawaii, Obama is a graduate of Columbia University and Harvard Law School, where he served as president of the Harvard Law Review. He was a community organizer in Chicago before earning his law degree. He worked as a civil rights attorney and taught constitutional law at University of Chicago Law School between 1992 and 2004. He served three terms representing the 13th District in the Illinois Senate from 1997 to 2004, running unsuccessfully for the United States House of Representatives in 2000 to Bobby Rush. In 2004, Obama received national attention during his campaign to represent Illinois in the United States Senate with his victory in the March Democratic Party primary, his keynote address at the Democratic National Convention in July, and his election to the Senate in November. He began his presidential campaign in 2007 and, after a close primary campaign against Hillary Rodham Clinton in 2008, he won sufficient delegates in the Democratic Party primaries to receive the presidential nomination. He then defeated Republican nominee John McCain in the general election, and was inaugurated as president on January 20, 2009. Nine months after his inauguration, Obama was named the 2009 Nobel Peace Prize laureate. During his first two years in office, Obama signed into law economic stimulus legislation in response to the Great Recession in the form of the American Recovery and Reinvestment Act of 2009 and the Tax Relief, Unemployment Insurance Reauthorization, and Job Creation Act of 2010. Other major domestic initiatives in his first term included the Patient Protection and Affordable Care Act, often referred to as "Obamacare"; the Dodd–Frank Wall Street Reform and Consumer Protection Act; and the Don\'t Ask, Don\'t Tell Repeal Act of 2010. In foreign policy, Obama ended U.S. military involvement in the Iraq War, increased U.S. troop levels in Afghanistan, signed the New START arms control treaty with Russia, ordered U.S. military involvement in Libya in opposition to Muammar Gaddafi, and ordered the military operation that resulted in the death of Osama bin Laden. In January 2011, the Republicans regained control of the House of Representatives as the Democratic Party lost a total of 63 seats; and, after a lengthy debate over federal spending and whether or not to raise the nation\'s debt limit, Obama signed the Budget Control Act of 2011 and the American Taxpayer Relief Act of 2012. Obama was reelected president in November 2012, defeating Republican nominee Mitt Romney, and was sworn in for a second term on January 20, 2013. During his second term, Obama has promoted domestic policies related to gun control in response to the Sandy Hook Elementary School shooting, and has called for greater inclusiveness for LGBT Americans, while his administration has filed briefs which urged the Supreme Court to strike down part of the federal Defense of Marriage Act and state level same-sex marriage bans as unconstitutional. In foreign policy, Obama ordered U.S. military intervention in Iraq in response to gains made by the Islamic State after the 2011 withdrawal from Iraq, continued the process of ending U.S. combat operations in Afghanistan, and normalized U.S. relations with Cuba.';
    
    it('should return an object', function (done) {
      var wordsObj = ashley.getWikiKeywords(wikiText, searchTerm);
      assert.isObject(wordsObj);
      done();
    });

    it('should categorize keywords', function (done) {
      var categorizedWords = ashley.getWikiKeywords(wikiText, searchTerm);
      expect(categorizedWords['nouns'].length).to.be.above(0);
      done();
    });
  });

  describe('getPoemKeywords', function () {
    var searchTerm = 'Barack Obama';
    var poem = 'With every morn their love grew tenderer, \n With every eve deeper and tenderer still; \n He might not in house, field, or garden stir, \n But her full shape would all his seeing fill; \n And his continual voice was pleasanter \n To her, than noise of trees or hidden rill; \n Her lute-string gave an echo of his name, \n She spoilt her half-done broidery with the same.';

    it('should return an object', function (done) {
      var wordsObj = ashley.getPoemKeywords(poem, searchTerm);
      assert.isObject(wordsObj);
      done();
    });

    it('should categorize keywords', function (done) {
      var categorizedWords = ashley.getPoemKeywords(poem, searchTerm);
      expect(categorizedWords['nouns'].length).to.be.above(0);
      expect(categorizedWords['adjectives'].length).to.be.above(0);
      expect(categorizedWords['verbs'].length).to.be.above(0);
      done();
    });
  });

  describe('replacePoemWords', function () {
    var poem = 'With every morn their love grew tenderer, \n With every eve deeper and tenderer still; \n He might not in house, field, or garden stir, \n But her full shape would all his seeing fill; \n And his continual voice was pleasanter \n To her, than noise of trees or hidden rill; \n Her lute-string gave an echo of his name, \n She spoilt her half-done broidery with the same.';
    var wikiText = 'Barack Hussein Obama II (US Listeni/bəˈrɑːk huːˈseɪn ɵˈbɑːmə/; born August 4, 1961) is the 44th and current President of the United States, and the first African American to hold the office. Born in Honolulu, Hawaii, Obama is a graduate of Columbia University and Harvard Law School, where he served as president of the Harvard Law Review. He was a community organizer in Chicago before earning his law degree. He worked as a civil rights attorney and taught constitutional law at University of Chicago Law School between 1992 and 2004. He served three terms representing the 13th District in the Illinois Senate from 1997 to 2004, running unsuccessfully for the United States House of Representatives in 2000 to Bobby Rush. In 2004, Obama received national attention during his campaign to represent Illinois in the United States Senate with his victory in the March Democratic Party primary, his keynote address at the Democratic National Convention in July, and his election to the Senate in November. He began his presidential campaign in 2007 and, after a close primary campaign against Hillary Rodham Clinton in 2008, he won sufficient delegates in the Democratic Party primaries to receive the presidential nomination. He then defeated Republican nominee John McCain in the general election, and was inaugurated as president on January 20, 2009. Nine months after his inauguration, Obama was named the 2009 Nobel Peace Prize laureate. During his first two years in office, Obama signed into law economic stimulus legislation in response to the Great Recession in the form of the American Recovery and Reinvestment Act of 2009 and the Tax Relief, Unemployment Insurance Reauthorization, and Job Creation Act of 2010. Other major domestic initiatives in his first term included the Patient Protection and Affordable Care Act, often referred to as "Obamacare"; the Dodd–Frank Wall Street Reform and Consumer Protection Act; and the Don\'t Ask, Don\'t Tell Repeal Act of 2010. In foreign policy, Obama ended U.S. military involvement in the Iraq War, increased U.S. troop levels in Afghanistan, signed the New START arms control treaty with Russia, ordered U.S. military involvement in Libya in opposition to Muammar Gaddafi, and ordered the military operation that resulted in the death of Osama bin Laden. In January 2011, the Republicans regained control of the House of Representatives as the Democratic Party lost a total of 63 seats; and, after a lengthy debate over federal spending and whether or not to raise the nation\'s debt limit, Obama signed the Budget Control Act of 2011 and the American Taxpayer Relief Act of 2012. Obama was reelected president in November 2012, defeating Republican nominee Mitt Romney, and was sworn in for a second term on January 20, 2013. During his second term, Obama has promoted domestic policies related to gun control in response to the Sandy Hook Elementary School shooting, and has called for greater inclusiveness for LGBT Americans, while his administration has filed briefs which urged the Supreme Court to strike down part of the federal Defense of Marriage Act and state level same-sex marriage bans as unconstitutional. In foreign policy, Obama ordered U.S. military intervention in Iraq in response to gains made by the Islamic State after the 2011 withdrawal from Iraq, continued the process of ending U.S. combat operations in Afghanistan, and normalized U.S. relations with Cuba.';
    var searchTerm = 'Barack Obama';
    var poemKeys = ashley.getPoemKeywords(poem, searchTerm);
    var wikiKeys = ashley.getWikiKeywords(wikiText, searchTerm);
    var newPoem = ashley.insertKeywords(poem, searchTerm, poemKeys, wikiKeys);
    
    it('should have a function to replace words by part of speech', function () {
      expect(ashley.replacePoemWords).to.exist;
    });

    it('should return a different poem than was entered', function () {
      expect(newPoem).to.not.equal(poem);
    });

    it('should modify the poem to contain the search term', function () {
      expect(newPoem.indexOf(searchTerm)).to.not.equal(-1);
    });

    it('should not have the search term as the first word', function (){
      expect(newPoem.slice(4)).to.not.equal(searchTerm.slice(4));
    });

  });
});

describe('Poem creation', function () {
  describe('getPoem', function () {
    var searchTerm = 'Russia';
    var badSearchTerm = 'ptardigrade';
    xit('should return a machine-generated poem containing the search term', function (done) {
      this.timeout(3000);
      var generatedPoem = ashley.getPoem('keats', searchTerm, function (result){
        expect(result.poem.length).to.be.above(0);
        expect(result.poem.indexOf(searchTerm)).to.not.equal(-1);
        done();
      });
    });

    xit('should do return error message if the search term is not found on Wikipedia', function (done) {
      this.timeout(3000);
      var generatedPoem = ashley.getPoem('keats', badSearchTerm, function (result) {
        expect(result).to.equal('Sorry, our poet was uninspired by your search term. Please try again.');
        done();
      });
    });
  });
});





