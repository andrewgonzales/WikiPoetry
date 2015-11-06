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
          res.status(201).send(article).end();
        } else if(err) {
          res.send(err);
        }
      });
    } else {
      // no user generated article found, create one
      Articles.create(article, function (err, result) {
        if(result) {
          res.status(201).send(article).end();
        } else if(err) {
          res.send(err);
        }
      });
    }
  });
};

module.exports.get = function (req, res, next) {
  var title = req.query.term;
  console.log('req query', req.query);
  console.log('title sent to db', title);
  Articles.findOne({'first.title': title}, function (err, result) {
    console.log('query result:', result);
    if(err) {
      res.send('error');
    } else if(result) {
      // res.json(result);
      res.status(200).json(result).end();
    } else {
      res.send('not found');
    }
  });
};

// Person.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, person) {
//   if (err) return handleError(err);
//   console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host.
// })

// { "_id" : ObjectId("563d284ae1bd8c781401436d"), "picture" : "upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/125px-Flag_of_Japan.svg.png", "caption" : "Japan should eyes to one\n", "fourth" : { "title" : "Prehistory and ancient history", "text" : " with blow belet and seen\n and more Japan\n World same should stood\n country sat she she so seem\n the such she seeth,\n" }, "third" : { "title" : "History", "text" : "Japan History poem poem blah blah" }, "second" : { "title" : "Etymology", "text" : " China sees in the piteless in the blow so seen she deep\n and heart of been\n the she Japanese make,\n Japan with the blow to were blows so some line\n the period from a sun she said,\n" }, "first" : { "title" : "Japan", "text" : " the more soft early some sing,\n first the seen heart,\n period behes and world's China Japan to the must with her sees deep she to her world's\n in in her seem\n she spressies the for the to her she,\n" }, "__v" : 0 }

