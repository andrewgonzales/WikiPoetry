var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wikipoetry');
// create user schema
var userSchema = new mongoose.Schema({
  username: 'string',
  hash: 'string',
  email: 'string',
  firstName: 'string',
  lastName: 'string'
});

var User = mongoose.model('User', userSchema);