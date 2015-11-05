var WikiPoetryDispatcher = require('../dispatcher/WikiPoetryDispatcher');
var EventEmitter = require('events').EventEmitter;
var WikiConstants = require('../constants/WikiConstants');
var assign = require('object-assign');
var jwt = require('jwt-simple');

var _user = '';
var _jwt = '';
var LOGIN_EVENT = 'login';
function newLogin (user, jwt) {
  _user = user;
  _jwt = jwt;
};

var LoginStore = assign({}, EventEmitter.prototype, {
  emitLogin: function() {
    this.emit(LOGIN_EVENT);
    // set a prop to true 
  },
  // create a listener function
  getUser: function () {
    return _user;
  }, 

  addLoginListener: function (callback) {
    this.on(LOGIN_EVENT, callback);
  },

  removeLoginListener: function (callback) {
    this.removeListener(LOGIN_EVENT, callback);
  }

});

WikiPoetryDispatcher.register(function (action) {
  console.log(action.actionType);
  switch(action.actionType) {
    case WikiConstants.ActionTypes.LOGIN:
      console.log('are we in here?');
      console.log(action.jwt);
      newLogin(jwt.decode(action.jwt, 'secret'), action.jwt);
      LoginStore.emitLogin();
      break;
    default:
  }
});

module.exports = LoginStore;
