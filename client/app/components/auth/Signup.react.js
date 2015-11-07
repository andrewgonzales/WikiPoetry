var React = require('react');
var WikiPoetryActionCreators = require('../../actions/WikiPoetryActionCreators');
var ReactRouter = require('react-router');
var API = require('./../../api/login');

var Signup = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function() {
    return {user: '', pass: ''};
  },
  onChangeUser: function(e) {
    this.setState({user: e.target.value});
  },
  onChangePass: function(e) {
    this.setState({pass: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    // make password into hash 
    // call action creators
    API.signup({user: this.state.user, pass: this.state.pass}, function(jwt) {
      // put jwt in localStorage
      // window.localStorage.setItem('user', jwt);
      // redirect to homepage
      this.history.pushState(null, '/login', null);
      // call login actions 
      // WikiPoetryActionCreators.signup(jwt);
    }.bind(this)); 
  },

  render: function () {
    return (
      <div className="signupdiv">
        <h1>Get your poetic license.</h1>
        <form onSubmit={this.handleSubmit}>
          <p>
            <input onChange={this.onChangeUser} value={this.state.user} type="text" name="login" placeholder="Username or Email"></input>
          </p>
          <p>
            <input onChange={this.onChangePass} type="password" name="password" value={this.state.pass} placeholder="Password"></input>
          </p>
          <p className="submit"><input type="submit" name="commit" value="Become a poet"></input></p>
        </form>
      </div>
    );
  }
});

module.exports = Signup;
