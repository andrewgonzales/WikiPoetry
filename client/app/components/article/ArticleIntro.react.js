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

var ArticleIntro = React.createClass({

  mixins:[ReactRouter.History],

  getInitialState: function () {
    return {
      type: WikiPoetryStore.getType(),
    }
  },

  handleClick: function (event, word) {
    event.preventDefault();
    WikiPoetryActionCreators.submitSearch(word);
    API.getArticlePage(this.state.type, word, function (data) {
      data.term = word;
      this.history.pushState(data, '/Article/' + word, null );
    }.bind(this));
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
  }
});

module.exports = ArticleIntro;