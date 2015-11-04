//What will the actions determined in the constant do?

var WikiPoetryDispatcher = require('../dispatcher/WikiPoetryDispatcher');
var WikiConstants = require('../constants/WikiConstants');

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
  }
}
