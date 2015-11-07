var WikiPoetryDispatcher = require('../dispatcher/WikiPoetryDispatcher');
var EventEmitter = require('events').EventEmitter;
var WikiConstants = require('../constants/WikiConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var SUBMIT_EVENT = 'submitted';
var LOGIN_EVENT = 'login';
var ARTICLE_EVENT = 'article change';
var TYPE_EVENT = 'type';
var EDIT_EVENT = 'edit';
var SAVE_EVENT = 'save';
//Default type to shakespeare when page loads
var _type = 'keats';
var _home = {};
var _article = {};
var _term = '';
var _poems = [];
var _load = false;
var _editMode = {
  editing: false,
  key: ''
};

function newType (type) {
  _type = type;
  _load = true;
};

function newTerm (term) {
  _term = term;
  _load = true;
}

function newHomeContent (home) {
  _home = home;
  _load = false;
}

function newArticleContent (article) {
  _article = article;
  _load = false;
}

function newPoem (poem) {
  _poems = poem;
}

function clearPoems () {
  _poems = [];
}

function newMode (editObj) {
  _editMode.editing = editObj.editing;
  _editMode.key = editObj.key;
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

  getPoems: function () {
    return _poems;
  },

  getLoad: function () {
    return _load;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getMode: function () {
    return _editMode;
  },

  emitSubmit: function () {
    this.emit(SUBMIT_EVENT);
  },

  emitArticleChange: function() {
    this.emit(ARTICLE_EVENT);
  },

  emitType: function () {
    this.emit(TYPE_EVENT);
  },

  emitEdit: function () {
    this.emit(EDIT_EVENT);
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
  },

  addTypeListener: function (callback) {
    this.on(TYPE_EVENT, callback);
  },

  removeTypeListener: function (callback) {
    this.removeListener(TYPE_EVENT, callback);
  },

  addEditListener: function (callback) {
    this.on(EDIT_EVENT, callback);
  },

  removeEditListener: function(callback) {
    this.removeListener(EDIT_EVENT, callback);
  }

});

WikiPoetryDispatcher.register(function (action) {
  switch(action.actionType) {
    case WikiConstants.ActionTypes.PICK_TYPE:
      newType(action.type);
      WikiPoetryStore.emitType();
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
      break;

    case WikiConstants.ActionTypes.EDIT_SECTION:
      newMode(action.mode);
      WikiPoetryStore.emitEdit();
      break;

    case WikiConstants.ActionTypes.GET_USER_POEM:
      newArticleContent(action.userPoem);
      WikiPoetryStore.emitArticleChange();
      break;

    default: 
  }
})
module.exports = WikiPoetryStore;
