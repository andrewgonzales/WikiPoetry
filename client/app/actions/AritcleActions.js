var Dispatcher = require('./../dispatcher/WikiPoetryDispatcher');
var $ = require('jQuery');
var ActionTypes = require('./../constants/WikiConstants');

var ArticleActions = {

  getArticle: function(type, seed) {
    var newArticle = $.ajax({
      url: 'api/rnn/article/',
      type: 'GET',
      data: {type: type, seed: seed},
      success: function(data) {
        return data;
      },
      error: function(xhr, status, err) {
        console.log(status) ;
        console.log(err.toString());
        console.log(xhr)
      }
    });

    Dispatcher.dispatch({
      actionType: ActionsTypes.GET_ARTICLE,
      data: newArticle;
    });
  }
}

module.exports = ArticleActions;