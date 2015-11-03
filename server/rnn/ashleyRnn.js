
var ashley = require('../ashleyjs/index.js')

module.exports = {

  getSearch: function (req, res, next) {
    var searchTerm = req.query.term;
    var searchType = req.query.type;

    ashley.getPoem(searchType, searchTerm, function(poem) {
      res.status(200).send(poem).end();
    });
  },

  getHomePage: function (req, res, next) {
    var outputString = ashley.getHomePage(function(homepageData) {
      res.status(200).send(homepageData).end();
    });
  },

  getArticlePage: function (req, res, next) {
    var searchTerm = req.query.term;

    var outputString = ashley.getArticle(searchTerm, function(articleData) {
      res.status(200).send(articleData).end();
    })
  }
}



