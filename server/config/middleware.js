var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function (app, express) {

  var rnnRouter = express.Router();
  var usersRouter = express.Router();
  var articlesRouter = express.Router();
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use('/api/rnn', rnnRouter);
  app.use('/users', usersRouter);
  app.use('/articles', articlesRouter)

  require('../rnn/rnnRoutes.js')(rnnRouter);
  require('../users/usersRoutes.js')(usersRouter);
  require('../articles/articlesRoutes.js')(articlesRouter);
};
