var React = require('react');
var Search = require('./search/Search.react');

var Header = React.createClass({
  render: function () {
    return (
      <div className="u-pull-right four columns">
        <Search />
      </div>
    );
  }
});

module.exports = Header;
