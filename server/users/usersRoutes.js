var users = require('./users');
module.exports = function (app) {
  app.post('/login', users.login);
  app.post('/signup', users.signup);
};
