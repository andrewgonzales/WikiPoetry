//Main template of all articles on page
//Should we serve a random poem when user clicks this link?

var React = require('react');
var ArticleSubsection = require('./ArticleSubsection.react');
var ArticleImage = require('./ArticleImage.react');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');
var API = require('../../api/wikiApi');

var Article = React.createClass({

  getInitialState: function () {
    return {
      term: this.props.routeParams.term,
      text: {
        mainTitle: '',
        summaryPoem: '',
        subheading1: '',
        subheading2: '',
        subPoem1: '',
        subPoem2: ''
      },
      type: WikiPoetryStore.getType()
    }
  },

  componentDidMount: function () {
    API.getArticle({type: this.state.type, term: this.state.term}, function (data) {
      this.setState({text: {
        summaryPoem: data
      }});
    }.bind(this));  
  },

  render: function () {
    var newInfo = this.props.location.state;
    console.log(newInfo)
    
    return (
      <div className="ten columns" id="article">
        <div className="article-container">
          <h3 className="article-title">{newInfo.term}</h3>
          <ArticleImage picture={newInfo.picture} />
          <p>{newInfo.poem}</p>
          <ArticleSubsection
            subheading={newInfo.headings[0]}
            subcontent={this.state.text.subPoem1} />
          <ArticleSubsection
            subheading={newInfo.headings[1]}
            subcontent={this.state.text.subPoem2} />
          <ArticleSubsection
            subheading={newInfo.headings[2]}
            subcontent={this.state.text.subPoem3} />
        </div>
      </div>
    );
  }
});

module.exports = Article;
