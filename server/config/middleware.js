var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function (app, express) {

  var rnnRouter = express.Router();
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  console.log(__dirname + '/client');
  console.log(__dirname + '/dist');
  // app.use(express.static(__dirname + '/../../dist'));


  app.use('/api/rnn', rnnRouter);

  require('../rnn/rnnRoutes.js')(rnnRouter);
};
