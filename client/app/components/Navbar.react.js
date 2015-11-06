//Quote of the hour
  //changes every hour
var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var LoginStore = require('../stores/LoginStore');
var WikiPoetryActionCreators = require('../actions/WikiPoetryActionCreators');
var Cartridge = require('./cartridge/Cartridge.react');

var Navbar = React.createClass({
  getInitialState: function () {
    return {
      loggedIn: !(LoginStore.getUser() === '')
    }
  },
  componentDidMount: function () {
    LoginStore.addLoginListener(this._onChange);
  },
  componentWillUnmount: function () {
    LoginStore.removeLoginListener(this._onChange);
  },
  _onChange: function () {
    this.setState({
      loggedIn: !(LoginStore.getUser() === '')
    });
  },
  logout: function(e) {
    e.preventDefault();
    // delete jwt form localStorage
    window.localStorage.removeItem('user');
    // action LOGOUT
    WikiPoetryActionCreators.logout();
  },

  render: function () {
    var term = this.props.params;
    var log = this.state.loggedIn ? 'Logout' : 'Login';
    var clickEvent = this.state.loggedIn ? this.logout : null;
    var signin = this.state.loggedIn ? null : <li><Link to="/Signup" activeClassName="link-active">Signup</Link></li>;
    return (
      <div>
        <ul>
          <li><Link to="/" activeClassName="link-active"><img src="images/wp_logo.jpg"/></Link></li>
          <li><Link to="/" activeClassName="link-active">Home</Link></li>
          <li><Link to="/AboutUs" activeClassName="link-active">About Us</Link></li>
          <li><Link to={"/" + log} onClick={clickEvent} activeClassName="link-active">{log}</Link></li>
          {signin}
        </ul>
        <Cartridge />
      </div>
    );
  }
});

module.exports = Navbar;
