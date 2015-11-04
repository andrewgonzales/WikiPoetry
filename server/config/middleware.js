var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function (app, express) {

  var rnnRouter = express.Router();
  var usersRouter = express.Router();
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use('/api/rnn', rnnRouter);
  app.use('/users', usersRouter);

  require('../rnn/rnnRoutes.js')(rnnRouter);
  require('../users/usersRoutes.js')(usersRouter);
};
