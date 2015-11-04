var $ = require('jquery');
exports.login = function(json, callback) {
  $.ajax({
    type: "POST",
    url: '/users/login',
    data: json,
    success: function (jwt) {
      console.log('success');
      callback(jwt.token);
    },
    error: function(xhr, status, err) {
      console.log(xhr, status, err);
    },  
    dataType: 'json'
  });
};
exports.signup = function (json, callback) {
  $.ajax({
    type: "POST",
    url: '/users/signup',
    data: json,
    success: function (jwt) {
      console.log('success');
      callback(jwt.token);
    },
    error: function(xhr, status, err) {
      console.log(xhr, status, err);
    },  
    dataType: 'json'
  });
};