//Main template of all articles on page
//Should we serve a random poem when user clicks this link?

var React = require('react');
var ReactRouter = require('react-router');
var ArticleSubsection = require('./ArticleSubsection.react');
var ArticleImage = require('./ArticleImage.react');
var ArticleIntro = require('./ArticleIntro.react');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');
var API = require('../../api/wikiApi');

var Article = React.createClass({

  mixins: [ReactRouter.History],

  getInitialState: function () {
    return {
      term: WikiPoetryStore.getTerm(),
      type: WikiPoetryStore.getType(),
    }
  },

  componentDidMount: function () {
    WikiPoetryStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    WikiPoetryStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var newInfo = this.props.location.state;
    var articleType = this.state.type;
    
    return (
      <div className="ten columns" id="article">
        <div className="article-container">
          <h3 className="article-title">{newInfo.term}</h3>
          <ArticleImage picture={newInfo.picture} />
          <ArticleIntro term={newInfo.term} type={articleType}/>
          {newInfo.headings.map(function (heading, i) {
            return (
              <ArticleSubsection
                key={'heading' + i}
                subheading={heading} 
                term={newInfo.term} 
                type={articleType}/>
            );
          })}
        </div>
      </div>
    );
  },

  _onChange: function () {
    this.setState({
      type: WikiPoetryStore.getType()
    })
  }
});

module.exports = Article;
