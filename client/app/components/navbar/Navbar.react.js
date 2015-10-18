//Quote of the hour
  //changes every hour
var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Navbar = React.createClass({

  render: function () {
    return (
      <div className="navbar"> 
        <Link to="/">Home</Link>{' '}
        <div><a href="#">How It Works</a></div>
        <div><a href="#">About Us</a></div>
      </div>
    );
  }
});

module.exports = Navbar;
