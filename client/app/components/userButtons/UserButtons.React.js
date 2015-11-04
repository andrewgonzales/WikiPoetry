var React = require('react');
var WikiPoetryActionCreators = require('../../actions/WikiPoetryActionCreators');
// import loginstore
var LoginStore = require('./../../stores/LoginStore');
var el;

if(LoginStore.isLoggedIn()) {
  el = <button onClick={this.handleEdit}>Edit</button>
    <button onClick={this.handlePoems}>My poems</button>
    <button onClick={this.handleLogout}>Logout</button>;
} else {
  el = <button onClick={this.handleLogin}>Login</button>;
}

var userButtons = React.createClass({
  handleEdit: function () {
    // RYAN TO DO
    // do all the editing 
      // either randomly generate it 
      // or if we have time, turn it into a giant text box 

  },
  handlePoems: function () {
    // RYAN TO DO
    // redirect to new components called myPoems 
    // this will contain all the poems somebody saved 
  },
  handleLogout: function () {
    // RYAN TO DO
    // logs the user out and gets rid of the buttons 
  },
  handleLogin: function () {

  },
  render: function () {

    return (el);
  }
});

module.exports = Login;