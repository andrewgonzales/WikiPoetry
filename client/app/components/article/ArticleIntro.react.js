var React = require('react');
var API = require('../../api/wikiApi');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');
var WikiPoetryActionCreators = require('../../actions/WikiPoetryActionCreators');
var ReactRouter = require('react-router');

function getSearchTerm () {
  return { 
    term: WikiPoetryStore.getTerm()
  }
};

function getArticleContent() {
  return WikiPoetryStore.getArticle();
}

var ArticleIntro = React.createClass({

  mixins:[ReactRouter.History],

  getInitialState: function () {
    return {
      type: WikiPoetryStore.getType(),
    }
  },

  componentDidMount: function () {
    WikiPoetryStore.addArticleListener(this._onChange);
  },

  componentWillUnMount: function () {
    WikiPoetryStore.removeArticleListener(this._onChange);
  },

  handleClick: function (event, word) {
    event.preventDefault();
    WikiPoetryActionCreators.submitSearch(word);
    WikiPoetryActionCreators.getArticleContent(this.state.type, word);
  },

  linkifyArticle: function (content, links) {
    var words = content.split(' ');
    var index;
    var spaced = [];
    var linkedArray = words.map(function(word, i) {
      if (links.indexOf(word) !== -1) {
        index = links.indexOf(word);
        var linkedWord = React.createElement("a", {key: i, href: '#', onClick: function(e){this.handleClick(e, word)}.bind(this), activeClassName: "link-active"}, word);
        return linkedWord;
      } else {
        return word;
      }
    }.bind(this));
    linkedArray.forEach(function(strOrObj) {
      spaced.push(strOrObj);
      spaced.push(' ');
    });
    return spaced;
  },

  render: function () {
    var content = this.props.poem;
    var links = this.props.links;
    var linkedPoem = this.linkifyArticle(content, links);

    return (
      <p>
        {linkedPoem}
      </p>
    );
  },

  _onChange: function () {
    // this.setState(getArticleContent());
    if (this.state.term) {
      this.history.pushState(getArticleContent(), '/Article/' + this.state.term, null);
    }
  }
});

module.exports = ArticleIntro;