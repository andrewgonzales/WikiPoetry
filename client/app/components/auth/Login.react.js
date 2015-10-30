var React = require('react');
var WikiPoetryActionCreators = require('../../actions/WikiPoetryActionCreators');

var Login = React.createClass({

  render: function () {

    return (
      <div class="login">
        <h1>Become a Ryan</h1>
        <form method="post" action="index.html">
          <p>
            <input type="text" name="login" value="" placeholder="Username or Email"></input></p>
          <p><input type="password" name="password" value="" placeholder="Password"></input></p>
          <p class="remember_me">
            <label>
              <input type="checkbox" name="remember_me" id="remember_me"></input>
              Remember me on this computer
            </label>
          </p>
          <p class="submit"><input type="submit" name="commit" value="Login"></input></p>
        </form>
      </div>
    );
  }
});

module.exports = Login;