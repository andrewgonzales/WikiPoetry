//Components are like Views
//Top level app view
var React = require('react');
var Navbar = require('./Navbar.react')
var Home = require('./home/Home.react')

var WikiPoetryApp = React.createClass({

  render: function() {
   var pathname = this.props.location;
   var key = 'root';
    return (
      <div className="wikiapp">
        <Navbar />
        <div>
        {React.cloneElement(this.props.children || <div/>, { key: pathname })}
        </div>
      </div>
    );
  }
});

module.exports = WikiPoetryApp;
