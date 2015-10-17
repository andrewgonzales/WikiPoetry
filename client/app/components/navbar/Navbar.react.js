//Quote of the hour
  //changes every hour
var React = require('react');

var Navbar = React.createClass({

  render: function () {
    return (
      <div className="navbar"> 
        <div><a href="#">Home</a></div>
        <div><a href="#">How It Works</a></div>
        <div><a href="#">About Us</a></div>
      </div>
    );
  }
});

module.exports = Navbar;