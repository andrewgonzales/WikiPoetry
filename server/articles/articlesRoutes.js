var articles = require('./articles');
module.exports = function (app) {
  app.post('/save', articles.save);
  app.get('/get', articles.get);
};
