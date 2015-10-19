//Quote of the hour
  //changes every hour
(function () {
  'use strict';

  var React = require('react');
  var ReactRouter = require('react-router');
  var Link = ReactRouter.Link;

  var Navbar = React.createClass({

    render: function () {
      return (
        <nav className="navbar navbar-default"> 
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              <img src="#" />
            </Link>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/article">Article</Link></li>
              <li><Link to="/howitworks">How It Works</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>
        </nav>
      );
    }
  });

  module.exports = Navbar;
})()
