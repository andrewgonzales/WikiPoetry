
var ashley = require('../ashleyjs/index.js')

module.exports = {

  getSearch: function (req, res, next) {
    var searchTerm = req.query.term;
    var searchType = req.query.type;
    var amount = Number(req.query.amount) || 1;

    // Recursive function to pull poems multiple poems out of
    // the async getPoem function
    var synchronize = function (counter, poems) {
      if (counter === amount) {
        res.status(200).send(poems).end();
        return;
      }
      ashley.getPoem(searchType, searchTerm, function(poem) {
        poems.push(poem);
        synchronize(++counter, poems);
      });    
    };
    synchronize(0,[]);
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



