var React = require('react');
var API = require('../../api/wikiApi');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');

var ArticleSubsection = React.createClass({

  getInitialState: function () {
    return {
      type: WikiPoetryStore.getType(),
      subContent: '',
      replaced: []
    }
  },

  componentDidMount: function () {
    WikiPoetryStore.addSubmitListener(this._onSubmit);
    API.getArticle({type: this.state.type, term: this.props.term}, function (data) {
      this.setState({
        subContent: data.poem,
        replaced: data.replaced
      });
    }.bind(this)); 
  },

  componentWillUnmount: function () {
    WikiPoetryStore.removeChangeListener(this._onSubmit);
  },

  render: function () {
    return (
      <div className="subsection">
        <div className="input">{this.props.error}</div>
        <h4 className="subheading">{this.props.subheading}</h4>
        <p className="subcontent">{this.state.subContent}</p>
      </div>
    );
  },

  _onSubmit: function () {
    console.log('submit');
    API.getArticle({type: this.state.type, term: this.props.term}, function (data) {
      this.setState({
        subContent: data.poem,
        replaced: data.replaced
      });
    }.bind(this));
  }
});

module.exports = ArticleSubsection;
