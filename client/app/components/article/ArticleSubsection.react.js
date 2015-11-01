var React = require('react');
var API = require('../../api/wikiApi');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

function getSearchTerm () {
  console.log('get search term');
  return { 
    term: WikiPoetryStore.getTerm()
  }
};

var ArticleSubsection = React.createClass({

  mixins: [ReactRouter.History],

  getInitialState: function () {
    console.log('get init state');
    return {
      type: WikiPoetryStore.getType(),
      subContent: '',
      replaced: []
    }
  },

  componentDidMount: function () {
    console.log('comp did mount');
    API.getArticle({type: this.state.type, term: this.props.term}, function (data) {
      this.setState({
        subContent: data.poem,
        replaced: data.replaced
      });
    }.bind(this)); 
  },

  componentWillReceiveProps: function (nextProps) {
    //To erase page before AJAX request enters new poem
    
    console.log('will reeive props');
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

  handleClick: function (word) {
    console.log('handle click');
    console.log('outside', word);
    API.getArticlePage(this.state.type, word, function (data) {
      console.log('inside', word);
      data.term = word;
      this.history.pushState(data, '/Article/' + word, null );
    }.bind(this));
  },

  linkifyArticle: function (content, links) {
    console.log('linkify artilce');
    var words = content.split(' ');
    var index;
    var spaced = [];
    var linkedArray = words.map(function(word, i) {
      if (links.indexOf(word) !== -1) {
        index = links.indexOf(word);
        var linkedWord = React.createElement("a", {key: i, onClick: function(){this.handleClick(word)}.bind(this), activeClassName: "link-active"}, word);
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
    console.log('render');
    var content = this.state.subContent;
    var links = this.state.replaced;
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
