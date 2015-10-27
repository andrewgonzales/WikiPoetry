
var ashley = require('../ashleyjs/index.js')

module.exports = {

  getSearch: function (req, res, next) {
    var searchTerm = req.query.text;
    var searchType = req.query.type;
    var outputString = {
      mainTitle: 'Love',
      summaryPoem: 'Lorem',
      subheading1: 'Introduction',
      subPoem1: 'Ipsum',
      subheading2: 'History',
      subPoem2: 'Dalor'
    };
    // var outputString = ashley.getPoem(searchType, searchTerm);
    res.status(200).send(outputString).end();

  },

  getHomePage: function (req, res, next) {
    // var outputString = {
    //   Featured: "Featured section",
    //   DidYouKnow: "Did you know section",
    //   InTheNews: "In the news section",
    //   OnThisDay: "On this day section"
    // };
    var outputString = ashley.getHomePage(function(homepageData) {
      res.status(200).send(homepageData).end();
    });
  },

  getHomeWiki: function (req, res, next) {
    var searchType = req.query.type;
    var testString = ashley.getPoem(searchType, 'home');
    res.status(200).send(testString).end();
  }

}



