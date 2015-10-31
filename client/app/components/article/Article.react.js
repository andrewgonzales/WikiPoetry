//Main template of all articles on page
//Should we serve a random poem when user clicks this link?

var React = require('react');
var ArticleSubsection = require('./ArticleSubsection.react');
var ArticleImage = require('./ArticleImage.react');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');
var API = require('../../api/wikiApi');

function getSearchTerm () {
  return WikiPoetryStore.getTerm();
};

var Article = React.createClass({

  getInitialState: function () {
    return {
      term: this.props.routeParams.term,
      type: WikiPoetryStore.getType()
    }
  },

  render: function () {
    var newInfo = this.props.location.state;
    var searchTerm = this.state.term;
    
    return (
      <div className="ten columns" id="article">
        <div className="article-container">
          <h3 className="article-title">{newInfo.term}</h3>
          <ArticleImage picture={newInfo.picture} />
          <p>{newInfo.poem}</p>
          {newInfo.headings.map(function (heading, i) {
            return (
              <ArticleSubsection
                key={'heading' + i}
                subheading={heading} 
                term={searchTerm} />
            );
          })}
        </div>
      </div>
    );
  },
});

module.exports = Article;
