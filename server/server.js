var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

require('./config/middleware.js')(app, express);
// require('./database.js');

process.env.PWD = process.cwd();
app.use(express.static(process.env.PWD + '/../../dist'));

if(!module.parent){ 
 app.listen(port);
}

module.exports = app;
