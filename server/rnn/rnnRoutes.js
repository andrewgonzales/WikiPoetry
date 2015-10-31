var ashleyRnn = require('./ashleyRnn.js');

module.exports = function (app) {
  // app === rnnRouter injected from middleware.js

  // app.param('seed', )
  // app.get('/:seed', ashleyRnn.compose);
  app.get('/', ashleyRnn.getSearch);
  app.get('/home', ashleyRnn.getHomePage);
  app.get('/article', ashleyRnn.getArticlePage);
} 
