var React = require('react');
var ReactRouter = require('react-router');

var Article = require('./Article.react');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');
var API = require('./../../api/wikiApi');

var ArticleRedirect = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function () {
    return {
      type: WikiPoetryStore.getType()
    }
  },

  handleClick: function (event) {
    var word = this.refs.love.innerText;
    console.log(word);

    API.getArticlePage(this.state.type, word, function (data) {
      data.term = word;
      this.history.pushState(data, '/Article/' + word, null );
    }.bind(this));
  },

  render: function () {

    return (
      <div>
        <h4>{this.props.text}</h4>
        <h5 id="test"> Try this recommended post instead! </h5>
        <ul>
          <li><a href="/#/Article" onClick={this.handleClick}  activeClassName="link-active" ref="love">Love</a></li>
        </ul>
      </div>
    );
  }
});

module.exports = ArticleRedirect;
