var React = require('react');
var API = require('../../api/wikiApi');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');

var ArticleSubsection = React.createClass({

  getInitialState: function () {
    return {
      type: WikiPoetryStore.getType(),
      text: ''
    }
  },

  componentDidMount: function () {
    API.getArticle({type: this.state.type, term: this.props.term}, function (data) {
      console.log(data);
      this.setState({text: {
        subContent: data
      }});
    }.bind(this)); 
  },

  render: function () {
    return (
      <div className="subsection">
        <div className="input">{this.props.error}</div>
        <h4 className="subheading">{this.props.subheading}</h4>
        <p className="subcontent">{this.state.text.subContent}</p>
      </div>
    );
  }
});

module.exports = ArticleSubsection;
