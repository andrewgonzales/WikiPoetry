var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
require('./config/middleware.js')(app, express);
require('./database.js');
 
// serve up statis files
app.use(express.static(__dirname + '/dist'));

if (!module.parent) {
  app.listen(port);
}

console.log('Making magic happen on port ' + port);

module.exports = app;
