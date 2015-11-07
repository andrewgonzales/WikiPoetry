var $ = require('jquery');

exports.savePoem = function (wholeArticle, callback) {
  $.ajax({
    url: '/articles/save',
    type: 'POST',
    data: wholeArticle,
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

exports.getPoem = function (term, callback) {
  $.ajax({
    url: '/articles/get',
    type: 'GET',
    data: {term: term},
    success: function(data) {
      console.log('getPoem success data:', data);
      callback(data);
    },
    error: function(xhr, status, err) {
      console.log(status) ;
      console.log(err.toString());
      console.log(xhr)
    }
  });
};

