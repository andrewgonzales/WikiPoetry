var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

require('./config/middleware.js')(app, express);
// require('./database.js');
process.env.PWD = process.cwd();
console.log(process.env.PWD + '/dist');
app.use(express.static('app/server/dist'));

// if(!module.parent){ 
 app.listen(port);
// }

module.exports = app;
