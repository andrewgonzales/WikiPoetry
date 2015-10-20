var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wikipoetry', function() {
  console.log('mongoose connected');
});
