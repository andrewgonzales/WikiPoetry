var React = require('react');
var ReactRouter = require('react-router');

var Article = require('./Article.react');
var WikiPoetryActionCreators = require('../../actions/WikiPoetryActionCreators');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');
var API = require('./../../api/wikiApi');

function getArticleContent() {
  return WikiPoetryStore.getArticle();
}


var ArticleRedirect = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function () {
    return {
      type: WikiPoetryStore.getType()
    }
  },

  componentDidMount: function () {
    WikiPoetryStore.addArticleListener(this._onChange);
  },

  componentWillUnMount: function () {
    WikiPoetryStore.removeArticleListener(this._onChange);
  },

  handleClick: function (event) {
    var word = this.refs.love.innerText;
    event.preventDefault();
    WikiPoetryActionCreators.submitSearch(word);
    WikiPoetryActionCreators.getArticleContent(this.state.type, word);
  },

  render: function () {
    
    return (
      <div>
        <h4>{this.props.text}</h4>
        <h5 id="test"> Try this recommended post instead! </h5>
        <ul>
          <li><a href="#" onClick={function(event){this.handleClick(event)}.bind(this)}  activeClassName="link-active" ref="love">Love</a></li>
        </ul>
      </div>
    );
  },

  _onChange: function () {
    if (this.state.term) {
      this.history.pushState(getArticleContent(), '/Article/' + this.state.term, null);
    }
  }
});

module.exports = ArticleRedirect;
