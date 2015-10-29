var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

require('./config/middleware.js')(app, express);
// require('./database.js');

if(!module.parent){ 
 app.listen(port);
}

module.exports = app;
