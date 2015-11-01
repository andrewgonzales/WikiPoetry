//Main template of all articles on page
//Should we serve a random poem when user clicks this link?

var React = require('react');
var ReactRouter = require('react-router');
var ArticleSubsection = require('./ArticleSubsection.react');
var ArticleImage = require('./ArticleImage.react');
var ArticleIntro = require('./ArticleIntro.react');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');
var API = require('../../api/wikiApi');

function getSearchTerm () {
  return WikiPoetryStore.getTerm();
};

var Article = React.createClass({

  mixins: [ReactRouter.History],

  getInitialState: function () {
    return {
      term: getSearchTerm(),
      type: WikiPoetryStore.getType()
    }
  },

<<<<<<< Updated upstream
  componentDidMount: function () {
    WikiPoetryStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    WikiPoetryStore.removeChangeListener(this._onChange);
=======
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
>>>>>>> Stashed changes
  },

  render: function () {
    var newInfo = this.props.location.state;
<<<<<<< Updated upstream
    var searchTerm = this.props.routeParams.term;
    var articleType = this.state.type;
=======
    var searchTerm = this.state.term;

    var linkedPoem = this.linkifyArticle(newInfo.poem, newInfo.replaced)
>>>>>>> Stashed changes
    
    return (
      <div className="ten columns" id="article">
        <div className="article-container">
          <h3 className="article-title">{newInfo.term}</h3>
          <ArticleImage picture={newInfo.picture} />
<<<<<<< Updated upstream
          <ArticleIntro term={searchTerm} type={articleType}/>
=======
          <p>{linkedPoem}</p>
>>>>>>> Stashed changes
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
