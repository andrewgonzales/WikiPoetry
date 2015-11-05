var React = require('react');
var LoginStore = require('./../../stores/LoginStore');
var ReactRouter = require('react-router');

var Banner = React.createClass({
  getInitialState: function () {
    return {
      user: LoginStore.getUser()
    }
  },
  componentDidMount: function () {
    LoginStore.addLoginListener(this._onChange);
  },
  componentWillUnmount: function () {
    LoginStore.removeLoginListener(this._onChange);
  },
  _onChange: function () {
    console.log('do we get in here: YES');
    this.setState({
      user: LoginStore.getUser()
    });
  },

  render: function () {
    return (
      <div>
        <h3>Welcome to WikiPoetry, {this.state.user}</h3>
        <p>Your number one source for computer generated poetry.</p>
      </div>
    );
  }
});

module.exports = Banner;
