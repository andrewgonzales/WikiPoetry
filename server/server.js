var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

require('./config/middleware.js')(app, express);
require('./database.js');

app.listen(port);
console.log('Making magic happen on port ' + port);

module.exports = app;
