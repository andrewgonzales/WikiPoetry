//Components are like Views
//Top level app view
var React = require('react');
var Navbar = require('./Navbar.react')
var Home = require('./home/Home.react')

var WikiPoetryApp = React.createClass({

  render: function() {
    return (
      <div className="wikiapp">
        <Navbar />
        <Home />
      </div>
    );
  }
});

module.exports = WikiPoetryApp;
