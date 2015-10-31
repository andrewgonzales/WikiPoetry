var React = require('react');
var WikiPoetryActionCreators = require('../../actions/WikiPoetryActionCreators');

var Login = React.createClass({
  getInitialState: function() {
    return {user: 'TEST', pass: ''};
  },
  onChangeUser: function(e) {
    this.setState({user: e.target.value});
  },
  onChangePass: function(e) {
    this.setState({pass: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    // call action creators 
    console.log(this.state.user);
  },

  render: function () {

    return (
      <div class="login">
        <h1>Become a Poet</h1>
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