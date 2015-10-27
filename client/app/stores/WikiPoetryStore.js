var WikiPoetryDispatcher = require('../dispatcher/WikiPoetryDispatcher');
var EventEmitter = require('events').EventEmitter;
var WikiConstants = require('../constants/WikiConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
//Default type to shakespeare when page loads
var _type = 'shakespeare';
var _home = {};
var _article = {};

function newType (type) {
  _type = type;
}

var WikiPoetryStore = assign({}, EventEmitter.prototype, {

  getType: function () {
    return _type;
  },

  getHome: function () {
    return _home;
  },

  getArticle: function () {
    return _article;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
})

WikiPoetryDispatcher.register(function (action) {
  console.log(action.actionType);
  switch(action.actionType) {
    case WikiConstants.PICK_TYPE:
      newType(action.type);
      WikiPoetryStore.emitChange();
      break;
  }
})

module.exports = WikiPoetryStore;
