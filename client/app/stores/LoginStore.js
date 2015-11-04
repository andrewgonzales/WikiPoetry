var WikiPoetryDispatcher = require('../dispatcher/WikiPoetryDispatcher');
var EventEmitter = require('events').EventEmitter;
var WikiConstants = require('../constants/WikiConstants');
var assign = require('object-assign');
var jwtdecode = require('jwt-decode');

var _user = '';
var _jwt = '';

function newLogin (user, jwt) {
  _user = user;
  _jwt = jwt;
};

var loginStore = assign({}. EventEmitter.prototype, {
  emitLogin: function() {
    this.emit(LOGIN_EVENT);
    // set a prop to true 
  }
});

WikiPoetryDispatcher.register(function (action) {
  console.log(action.actionType);
  switch(action.actionType) {
    case WikiConstants.PICK_TYPE:
      newType(action.type);
      WikiPoetryStore.emitChange();
      break;
    case WikiConstants.LOGIN:
      newLogin(jwtdecode(this.jwt), jwt);
      this.emitLogin();
      break;
  }
});

module.exports = LoginStore;
