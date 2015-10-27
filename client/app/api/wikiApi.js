var $ = require('jquery');

exports.getArticlePage = function (type, seed) {
  $.ajax({
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
};

exports.getHomePage = function (type, callback) {
  $.ajax({
    url: '/api/rnn/home',
    type: 'GET',
    data: {type: type},
    success: function(data) {
      console.log('Wiki request sent');
      callback(data);
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
      console.log('search term sent');
      callback(data);
    },
    error: function(xhr, status, err) {
      console.log(status) ;
      console.log(err.toString());
      console.log(xhr)
    }
  });
};
