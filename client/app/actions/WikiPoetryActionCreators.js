//What will the actions determined in the constant do?

var WikiPoetryDispatcher = require('../dispatcher/WikiPoetryDispatcher');
var WikiConstants = require('../constants/WikiConstants');
var API = require('./../api/wikiApi');

var ActionTypes = WikiConstants.ActionTypes;

module.exports = {

  pickType: function (value) {
    WikiPoetryDispatcher.dispatch({
      actionType: ActionTypes.PICK_TYPE,
      type: value
    });
  },
  submitSearch: function (term) {
    WikiPoetryDispatcher.dispatch({
      actionType: ActionTypes.SUBMIT_SEARCH,
      term: term
    });
  },

  login: function (jwt) {
    WikiPoetryDispatcher.dispatch({
      actionType: ActionTypes.LOGIN,
      jwt: jwt  
    });
  },
  signup: function (jwt) {
    WikiPoetryDispatcher.dispatch({
      actionType: ActionTypes.LOGIN,
      jwt: jwt  
    });

  getHomeContent: function (type) {
    API.getHomeContent(type, function (data) {
      WikiPoetryDispatcher.dispatch({
        actionType: ActionTypes.GET_HOME,
        content: data
      });
    });
  },

  getArticleContent: function (type, term, cb) {
    API.getArticlePage(type, term, function (data) {
      WikiPoetryDispatcher.dispatch({
        actionType: ActionTypes.GET_ARTICLE,
        content: data
      });
    });
    cb;
  }
}
