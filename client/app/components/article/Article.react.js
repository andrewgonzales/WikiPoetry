//Main template of all articles on page
//URL will not change but title will

(function() {
  'use strict';
  var React = require('react');

  var Article = React.createClass({

    render: function () {
      return (
        <div>
          <h1>Article Main</h1>
        </div>
      );
    }
  });

  module.exports = Article;
})()
