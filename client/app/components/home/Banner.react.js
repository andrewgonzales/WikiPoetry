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
    this.setState({
      user: LoginStore.getUser()
    });
  },

  render: function () {
    var text = this.state.user === '' ? '' : ', ' + this.state.user;
    return (
      <div>
        <h3>Welcome to WikiPoetry{text}</h3>
        <p>Your number one source for computer generated poetry.</p>
      </div>
    );
  }
});

module.exports = Banner;
