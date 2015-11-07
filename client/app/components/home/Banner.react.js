var React = require('react');
var LoginStore = require('./../../stores/LoginStore');
var ReactRouter = require('react-router');
var API = require('./../../api/wikiApi');

var Banner = React.createClass({
  mixins: [ReactRouter.History],
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

  handleClick: function () {
    // var search = this.props.link;

    API.getArticlePage('keats', this.search, function (data) {
      data.term = this.search;
      this.history.pushState(data, '/Article/' + search, null );
    }.bind(this));
  },

  render: function () {
    var text = this.state.user === '' ? '' : ', ' + this.state.user;
    return (
      <table id="categories">
        <tr><td><h3>Welcome to WikiPoetry{text}</h3></td><td></td><td></td></tr>
        <tr><td><a key={1} onClick={this.handleClick.bind(this.search, 'number')} href="#" activeClassName="link-active">5.000.000</a> articles of informative poetry</td><td><a>Arts</a></td><td><a>Geography</a></td></tr>
        <tr><td>Your number one source for computer generated <a>poetry</a></td><td><a>Mathematics</a></td><td><a>History</a></td></tr>
        <tr><td></td><td><a>Science</a></td><td><a>Biography</a></td></tr>
      </table>
    );
  }
});

module.exports = Banner;
