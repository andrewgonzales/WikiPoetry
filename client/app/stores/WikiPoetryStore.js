var WikiPoetryDispatcher = require('../dispatcher/WikiPoetryDispatcher');
var EventEmitter = require('events').EventEmitter;
var WikiConstants = require('../constants/WikiConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var SUBMIT_EVENT = 'submitted';
//Default type to shakespeare when page loads
var _type = 'keats';
var _home = {};
var _article = {};
var _term = '';

function newType (type) {
  _type = type;
};

function newTerm (term) {
  _term = term;
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

  getTerm: function () {
    return _term;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  emitSubmit: function() {
    this.emit(SUBMIT_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  addSubmitListener: function (callback) {
    this.on(SUBMIT_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(SUBMIT_EVENT, callback);
  }
})

WikiPoetryDispatcher.register(function (action) {
  switch(action.actionType) {
    case WikiConstants.ActionTypes.PICK_TYPE:
      newType(action.type);
      WikiPoetryStore.emitChange();
      break;

    case WikiConstants.ActionTypes.SUBMIT_SEARCH:
      newTerm(action.term);
      WikiPoetryStore.emitSubmit();
      break;

    default: 
  }
})

module.exports = WikiPoetryStore;
