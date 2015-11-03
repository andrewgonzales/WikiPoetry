var React = require('react');
var API = require('../../api/wikiApi');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');
var WikiPoetryActionCreators = require('../../actions/WikiPoetryActionCreators');
var ReactRouter = require('react-router');

function getSearchTerm () {
  console.log('get search term');
  return { 
    term: WikiPoetryStore.getTerm()
  }
};

var ArticleSubsection = React.createClass({

  mixins: [ReactRouter.History],

  getInitialState: function () {
    console.log('getInitialState called in ArticleSubsection');
    return {
      type: WikiPoetryStore.getType(),
      subContent: '',
      replaced: []
    }
  },

  componentDidMount: function () {
    console.log('componentDidMount called in articleSubsection');
    console.log('calling API.getArticle with an object containing')
    API.getArticle({type: this.state.type, term: this.props.term}, function (data) {
      console.log('data.replaced', data.replaced);
      this.setState({
        subContent: data.poem,
        replaced: data.replaced
      });
    }.bind(this)); 
  },

  componentWillReceiveProps: function (nextProps) {
    //To erase page before AJAX request enters new poem
    
    console.log('componentWillReceiveProps called in articleSubsection');
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
    console.log('render called in ArticleSubsection');
    var content = this.state.subContent;
    var links = this.state.replaced;
    console.log('links in render', links);
    var linkedArticle;
    if (content) {
      linkedArticle = this.linkifyArticle(content, links);
    }

    return (
      <div className="subsection">
        <div className="input">{this.props.error}</div>
        <h4 className="subheading">{this.props.subheading}</h4>
        <p className="subcontent">{linkedArticle}</p>
      </div>
    );
  },
});

module.exports = ArticleSubsection;
