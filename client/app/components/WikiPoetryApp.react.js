//Components are like Views
//Top level app view
var React = require('react');
var Navbar = require('./navbar/Navbar.react')
var Home = require('./home/Home.react')
var Article = require('./article/Article.react')

var WikiPoetryApp = React.createClass({

  render: function() {
    return (
      <div className="wikiapp">
        <Navbar />
        <Home />
        <Article />
      </div>
    );
  }
});

module.exports = WikiPoetryApp;