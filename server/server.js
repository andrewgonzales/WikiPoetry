var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
require('./config/middleware.js')(app, express);
require('./database.js');
 
// serve up statis files
app.use(express.static(__dirname + '/dist'));
passport.use(new GoogleStrategy({
    consumerKey: GOOGLE_CONSUMER_KEY,
    consumerSecret: GOOGLE_CONSUMER_SECRET,
    callbackURL: "localhost:8080/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({ username: profile.id }, function (err, user) {
      console.log(err, user);
      return done(err, user);
    });
    // create user of find him 
    console.log('create user');
  }
));

if (!module.parent) {
  app.listen(port);
}

console.log('Making magic happen on port ' + port);

module.exports = app;
