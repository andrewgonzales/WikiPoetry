//What will the actions determined in the constant do?

var WikiPoetryDispatcher = require('../dispatcher/WikiPoetryDispatcher');
var WikiConstants = require('../constants/WikiConstants');

var ActionTypes = WikiConstants.ActionTypes;

module.exports = {

  pickType: function (value) {
    WikiPoetryDispatcher.dispatch({
      action: ActionTypes.PICK_TYPE,
      type: value
    });
  }
}
