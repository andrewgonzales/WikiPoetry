var $ = require('jquery');

exports.getArticlePage = function (type, term, callback) {
  $.ajax({
    url: 'api/rnn/article',
    type: 'GET',
    data: {type: type, term: term},
    success: function(data) {
      exports.getArticle({type: type, term: term, amount: data.headings.length + 1}, function (poemData) {
        data.poemData = poemData;
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

exports.getHomeContent = function (type, callback) {
  $.ajax({
    url: '/api/rnn/home',
    type: 'GET',
    data: {type: type},
    success: function(data) {
      exports.getArticle({type: type, term: data.featured.link}, function(articleData) {
        data.featured.text = articleData[0].poem;
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
  $.ajax({
    url: '/api/rnn',
    type: 'GET',
    data: json,
    success: function(data) {
      callback(data);
    },
    error: function(xhr, status, err) {
      console.log(status) ;
      console.log(err.toString());
      console.log(xhr)
    }
  });
};

