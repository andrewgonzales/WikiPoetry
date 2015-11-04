var db = require('./../database.js');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
// create user schema
var userSchema = new mongoose.Schema({
  username: 'string',
  hash: 'string',
  email: 'string',
  firstName: 'string',
  lastName: 'string'
});

var User = mongoose.model('User', userSchema);
// make db collection
module.exports.login = function (req, res, next) {
  var user = req.body.user;
  var pass = req.body.pass;
    // check if person is in database 
  User.findOne({username: user}, function (err, person) {
    if(err) {
      console.log(err);
    } else if(person) { 
      bcrypt.compare(pass, person.hash, function(err, result) {
        // compare person.hash with our password 
        console.log('on bcrypt compare');
        if(result) {
          console.log('hash checks out, user can login');
          res.json({token: jwt.encode(user, 'secret')});
        } else {
          console.log(err);
        }
      });  
    }
  });
};

module.exports.signup = function (req, res, next) {
  var user = req.body.user;
  var pass = req.body.pass;
  var first = req.body.firstName;
  var last = req.body.lastName;
  bcrypt.hash(pass, null, null, function (err, result) {
    User.findOne({username: user}, function (err, person) {
      if(person) {
        console.log('Username is taken, please choose another one');
      } else {
        User.create({'username': user, 'hash': result, 'firstName': first, 'lastName': last}, function (err, person) {
          if(err) {
            console.log(err);
          }
          res.json({token: jwt.encode(user, 'secret')});
        });
      }
    }); 
  });
};