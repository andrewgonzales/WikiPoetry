var db = require('./../database.js');
var mongoose = require('mongoose');

var articlesSchema = new mongoose.Schema({
  picture: 'string',
  caption: 'string',
  first: {
    title: 'string',
    text: 'string'
  },
  second: {
    title: 'string',
    text: 'string'
  },
  third: {
    title: 'string',
    text: 'string'
  },
  fourth: {
    title: 'string',
    text: 'string'
  }
});

var Articles = mongoose.model('Articles', articlesSchema);
// make db collection
module.exports.save = function (req, res, next) {
  var article = {
    picture: req.body.picture,
    caption: req.body.caption,
    first: {
      title: req.body.first.title,
      text: req.body.first.text
    },
    second: {
      title: req.body.second.title,
      text: req.body.second.text
    },
    third: {
      title: req.body.third.title,
      text: req.body.third.text
    },
    fourth: {
      title: req.body.fourth.title,
      text: req.body.fourth.text
    }
  };
    // check if article is in database 
  Articles.findOne({first: {title: article.first.title}}, function (err, result) {
    if(err) {
      console.log(err);
    } else if(result) { 
      // article found, update it 
      Articles.update({first: {title: article.first.title}}, article, function (err, result) {
        if(result) {
          res.send('updated');
        } else if(err) {
          res.send(err);
        }
      });
    } else {
      // no user generated article found, create one
      Articles.create(article, function (err, result) {
        if(result) {
          res.send('created');
        } else if(err) {
          res.send(err);
        }
      });
    }
  });
};

module.exports.get = function (req, res, next) {
  var title = req.body.title;
  Articles.findOne({first: {title: title}}, function (err, result) {
    if(err) {
      res.send('error')
    } else if(result) {
      res.json(result);
    } else {
      res.send('empty');
    }
  });
};

