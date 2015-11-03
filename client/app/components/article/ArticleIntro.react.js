var React = require('react');
var API = require('../../api/wikiApi');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');
var WikiPoetryActionCreators = require('../../actions/WikiPoetryActionCreators');
var ReactRouter = require('react-router');

function getSearchTerm () {
  console.log('In ArticleIntro in getSearchTerm');
  return { 
    term: WikiPoetryStore.getTerm()
  }
};

var ArticleIntro = React.createClass({

  mixins:[ReactRouter.History],

  getInitialState: function () {
    return {
      type: WikiPoetryStore.getType(),
      subContent: '',
      replaced: []
    }
  },

  componentDidMount: function () {
    console.log('In ArticleIntro in componentDidMount this.prop.term is', this.props.term);
    console.log('In ArticleIntro in componentDidMount this.props.type is', this.props.type);
    API.getArticle({type: this.props.type, term: this.props.term}, function (data) {
      this.setState({
        subContent: data.poem,
        replaced: data.replaced
      });
    }.bind(this)); 
  },

  componentWillReceiveProps: function (nextProps) {
    //To erase page before AJAX request enters new poem
    this.setState({
      subContent: ''
    });

    API.getArticle({type: nextProps.type, term: nextProps.term}, function (data) {
      this.setState({
        subContent: data.poem,
        replaced: data.replaced
      });
    }.bind(this));
  },

  handleClick: function (event, word) {
    event.preventDefault();
    console.log('handleClick called in articleSubsection passing in:', word);
    WikiPoetryActionCreators.submitSearch(word);
    API.getArticlePage(this.state.type, word, function (data) {
      console.log('In handleClick API.getArticlePage returns', data);
      data.term = word;
      this.history.pushState(data, '/Article/' + word, null );
      console.log('this.history.pushState called')
    }.bind(this));
  },

  linkifyArticle: function (content, links) {
    console.log('linkifyArticle called in ArticleSubsection');
    console.log('content passed into linkifyArticle are:', content);
    console.log('links passed into linkifyArticle are:', links);
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
    console.log('In ArticleIntro in render this.state.subContent', this.state.subContent);
    var content = this.state.subContent;
    var links = this.state.replaced;
    var linkedPoem = this.linkifyArticle(content, links);

    return (
      <p>
        {linkedPoem}
      </p>
    );
  }
});

module.exports = ArticleIntro;