var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

require('./config/middleware.js')(app, express);
// require('./database.js');


// app.use('/test', function(req, res) {
//   res.send('This is it');
// });

app.use('/', express.static(__dirname + '/../../dist'));
if(!module.parent){ 
 app.listen(port);
}

module.exports = app;
