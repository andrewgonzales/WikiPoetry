//Quote of the hour
  //changes every hour
var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Navbar = React.createClass({

  render: function () {
    var pathname = this.props.location;
    return (
      <div className="navbar">
        <ul>
          <li><Link to="/Home" activeClassName="link-active">Home</Link></li>
          <li><Link to="/Article" activeClassName="link-active">Article</Link></li>
          <li><Link to="/HowItWorks" activeClassName="link-active">How It Works</Link></li>
          <div><a href="#">About Us</a></div>
        </ul>
        <div>
        {React.cloneElement(this.props.children || <div/>, { key: pathname })}
        </div>
      </div>
    );
  }
});

module.exports = Navbar;
