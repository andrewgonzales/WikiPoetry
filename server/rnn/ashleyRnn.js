
var ashley = require('../ashleyjs/index.js')

module.exports = {

  getSearch: function (req, res, next) {
    var searchTerm = req.query.text;
    var searchType = req.query.type;
    var outputString = ashley.getPoem(searchType, searchTerm);
    res.status(200).send(outputString).end();

  },

  getHomeWiki: function (req, res, next) {
    var searchType = req.query.type;
    var testString = ashley.getPoem(searchType, 'home');
    res.status(200).send(testString).end();
  }

}



