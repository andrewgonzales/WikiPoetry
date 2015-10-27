//Main template of all articles on page
//Should we serve a random poem when user clicks this link?

var React = require('react');
var ArticleSubsection = require('./ArticleSubsection.react');
var ArticleImage = require('./ArticleImage.react');

var Article = React.createClass({

  getInitialState: function () {
    return {
      text: {
        mainTitle: '',
        summaryPoem: '',
        subheading1: '',
        subheading2: '',
        subPoem1: '',
        subPoem2: ''
      }
    }
  },

  componentDidMount: function () {
    var poem = this.props.location.state;
    this.setState(poem);
  },

  render: function () {
    return (
      <div className="ten columns">
        <div className="article-container">
          <h3 className="article-title">{this.state.text.mainTitle}</h3>
          <ArticleImage />
          <p>{this.state.text.summaryPoem}</p>
          <ArticleSubsection
            subheading={this.state.text.subheading1}
            subcontent={this.state.text.subPoem1} />
          <ArticleSubsection
            subheading={this.state.text.subheading2}
            subcontent={this.state.text.subPoem2} />
        </div>
      </div>
    );
  }
});

module.exports = Article;
