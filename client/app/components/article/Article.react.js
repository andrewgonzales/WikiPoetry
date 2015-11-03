//Main template of all articles on page
//Should we serve a random poem when user clicks this link?

var React = require('react');
var ArticleSubsection = require('./ArticleSubsection.react');
var ArticleImage = require('./ArticleImage.react');
var ArticleIntro = require('./ArticleIntro.react');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');
var API = require('../../api/wikiApi');

function getSearchTerm () {
  return WikiPoetryStore.getTerm();
};

var Article = React.createClass({

  getInitialState: function () {
    return {
      term: getSearchTerm(),
      type: WikiPoetryStore.getType()
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
    var searchTerm = this.props.routeParams.term;
    var articleType = this.state.type;
    
    return (
      <div className="ten columns" id="article">
        <div className="article-container">
          <h3 className="article-title">{newInfo.term}</h3>
          <ArticleImage picture={newInfo.picture} />
          <ArticleIntro term={searchTerm} type={articleType}/>
          {newInfo.headings.map(function (heading, i) {
            return (
              <ArticleSubsection
                key={'heading' + i}
                subheading={heading} 
                term={searchTerm} 
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
