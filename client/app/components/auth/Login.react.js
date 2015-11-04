var React = require('react');
var WikiPoetryActionCreators = require('../../actions/WikiPoetryActionCreators');
var ReactRouter = require('react-router');
var API = require('./../../api/login');

var Login = React.createClass({
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
    API.login({user: this.state.user, pass: this.state.pass}, function(jwt) {
      // put jwt in localStorage
      window.localStorage.setItem('user', jwt);
      // redirect to homepage
      this.history.pushState(null, '/', null );
      // call login actions 
      WikiPoetryActionCreators.login(jwt);
    }.bind(this)); 
  },
  render: function () {
    return (
      <div class="login">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <p>
            <input onChange={this.onChangeUser} value={this.state.user} type="text" name="login" placeholder="Username or Email"></input>
          </p>
          <p>
            <input onChange={this.onChangePass} type="password" name="password" value={this.state.pass} placeholder="Password"></input>
          </p>
          <p class="submit"><input type="submit" name="commit" value="Login"></input></p>
        </form>
      </div>
    );
  }
});

module.exports = Login;