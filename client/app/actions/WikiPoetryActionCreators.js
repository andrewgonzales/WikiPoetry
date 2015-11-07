//What will the actions determined in the constant do?

var WikiPoetryDispatcher = require('../dispatcher/WikiPoetryDispatcher');
var WikiConstants = require('../constants/WikiConstants');
var API = require('./../api/wikiApi');
var db = require('./../api/dbAPI');
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

  logout: function () {
    WikiPoetryDispatcher.dispatch({
      actionType: ActionTypes.LOGOUT
    });
  },  

  editMode: function (bool, key) {
    WikiPoetryDispatcher.dispatch({
      actionType: ActionTypes.EDIT_SECTION,
      mode: {
        editing: bool,
        key: key
      }
    });
  },

  savePoem: function (wholeArticle) {
    //API call
    db.savePoem(wholeArticle, function (data){
      console.log('saved to db');
    }); 
  },

  getUserPoem: function (term) {
    db.getPoem(term, function (data) {
      // format object
      var formattedData = {
        term: term,
        headings: [data.second.title, data.third.title, data.fourth.title],
        picture: data.picture,
        pictureCaption: data.caption,
        poemData: [
          {poem: data.first.text, replaced: []},
          {poem: data.second.text, replaced: []},
          {poem: data.third.text, replaced: []},
          {poem: data.fourth.text, replaced: []}
        ] 
      };

      WikiPoetryDispatcher.dispatch({
        actionType: ActionTypes.GET_USER_POEM,
        userPoem: formattedData 
      });
    })
  },

  getHomeContent: function (type) {
    API.getHomeContent(type, function (data) {
      WikiPoetryDispatcher.dispatch({
        actionType: ActionTypes.GET_HOME,
        content: data
      });
    });
  },

  getArticleContent: function (type, term) { 
    if (type !== 'user') {
      API.getArticlePage(type, term, function (data) {
        data.term = term;
        data.keyIndex = 'intro';
        WikiPoetryDispatcher.dispatch({
          actionType: ActionTypes.GET_ARTICLE,
          content: data
        });
      });
    }
  },

  getNewPoems: function(type, term, amount) {
    var params = {type: type, term: term, amount: amount};
    API.getArticle(params, function (poemData) {
      WikiPoetryDispatcher.dispatch({
        actionType: ActionTypes.GET_POEMS,
        content: poemData
      });
    });
  },

  clearPoems: function() {
    WikiPoetryDispatcher.dispatch({
      actionType: ActionTypes.CLEAR_POEM
    });
  }
}
