var WikiPoetryDispatcher = require('../dispatcher/WikiPoetryDispatcher');
var EventEmitter = require('events').EventEmitter;
var WikiConstants = require('../constants/WikiConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var SUBMIT_EVENT = 'submitted';
var LOGIN_EVENT = 'login';
var ARTICLE_EVENT = 'article change';
//Default type to shakespeare when page loads
var _type = 'keats';
var _home = {};
var _article = {};
var _term = '';
var _poems = [];
var _editMode = false;

function newType (type) {
  _type = type;
};

function newTerm (term) {
  _term = term;
}

function newHomeContent (home) {
  _home = home;
}

function newArticleContent (article) {
  _article = article;
}

function newPoem (poem) {
  _poems = poem;
  console.log('store poems', _poems);
}

function clearPoems () {
  _poems = [];

function newMode (bool) {
  _editMode = bool;
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

<<<<<<< HEAD
  getPoems: function () {
    return _poems;
=======
  getMode: function () {
    return _editMode;
>>>>>>> (feat) Adds textarea when edit button clicked
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  emitSubmit: function() {
    this.emit(SUBMIT_EVENT);
  },

  emitArticleChange: function() {
    this.emit(ARTICLE_EVENT);
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

  removeSubmitListener: function(callback) {
    this.removeListener(SUBMIT_EVENT, callback);
  },

  addArticleListener: function (callback) {
    this.on(ARTICLE_EVENT, callback);
  },

  removeArticleListener: function (callback) {
    this.removeListener(ARTICLE_EVENT, callback);
  }
});

WikiPoetryDispatcher.register(function (action) {
  switch(action.actionType) {
    case WikiConstants.ActionTypes.PICK_TYPE:
      newType(action.type);
      WikiPoetryStore.emitChange();
      break;

    case WikiConstants.ActionTypes.GET_HOME:
      newHomeContent(action.content);
      WikiPoetryStore.emitChange();
      break;

    case WikiConstants.ActionTypes.GET_ARTICLE:
      newArticleContent(action.content);
      WikiPoetryStore.emitArticleChange();
      break;

    case WikiConstants.ActionTypes.SUBMIT_SEARCH:
      newTerm(action.term);
      WikiPoetryStore.emitChange();
      break;

    case WikiConstants.ActionTypes.GET_POEMS:
      newPoem(action.content);
      WikiPoetryStore.emitChange();
      break;

    case WikiConstants.ActionTypes.CLEAR_POEMS:
      clearPoems();

    case WikiConstants.ActionTypes.EDIT_SECTION:
      newMode(action.mode);
      WikiPoetryStore.emitChange();
      break;

    default: 
  }
})
module.exports = WikiPoetryStore;
