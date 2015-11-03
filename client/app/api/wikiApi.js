var $ = require('jquery');

exports.getArticlePage = function (type, term, callback) {
  console.log('API.getArticlePage was given type:', type, 'and word:', term);
  $.ajax({
    url: 'api/rnn/article',
    type: 'GET',
    data: {type: type, term: term},
    success: function(data) {
      console.log('getArticlePage in wikiAPI successfully returns data:', data);
      exports.getArticle({type: type, term: term}, function (articleData) {
        data.poem = articleData.poem;
        data.replaced = articleData.replaced;
        callback(data);
      })
    },
    error: function(xhr, status, err) {
      console.log(status) ;
      console.log(err.toString());
      console.log(xhr)
    }
  });
};

exports.getHomePage = function (type, callback) {
  console.log('In wikiApi getHomePage ajax request about to be sent with type:', type);
  $.ajax({
    url: '/api/rnn/home',
    type: 'GET',
    data: {type: type},
    success: function(data) {
      exports.getArticle({type: type, term: data.featured.link}, function(articleData) {
        data.featured.text = articleData.poem;
        callback(data);
      });
    },
    error: function(xhr, status, err) {
      console.log(status) ;
      console.log(err.toString());
      console.log(xhr)
    }
  });
};

exports.getArticle = function (json, callback) {
  console.log('In wikiApi getArticle ajax request about to be sent using json:', json);
  $.ajax({
    url: '/api/rnn',
    type: 'GET',
    data: json,
    success: function(data) {
      console.log('getArticle success with data:', data);
      callback(data);
    },
    error: function(xhr, status, err) {
      console.log(status) ;
      console.log(err.toString());
      console.log(xhr)
    }
  });
};
