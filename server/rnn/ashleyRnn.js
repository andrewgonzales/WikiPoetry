
var ashley = require('../ashleyjs/index.js')

module.exports = {

  getSearch: function (req, res, next) {
    console.log(req.query.text);
    var searchTerm = req.body.text;

    var testString = ashley.getPoem('shakespeare', searchTerm);
    res.status(200).send(testString).end();

  }

}



