var ashleyRnn = require('./ashleyRnn.js');

module.exports = function (app) {

  app.get('/', ashleyRnn.getSearch);
  app.get('/home', ashleyRnn.getHomePage);
  app.get('/article', ashleyRnn.getArticlePage);
}; 
