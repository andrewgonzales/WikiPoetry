var React = require('react');
var API = require('../../api/wikiApi');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');

function getSearchTerm () {
  return { 
    term: WikiPoetryStore.getTerm()
  }
};

var ArticleIntro = React.createClass({

  getInitialState: function () {
    return {
      type: WikiPoetryStore.getType(),
      subContent: '',
      replaced: []
    }
  },

  componentDidMount: function () {
    API.getArticle({type: this.state.type, term: this.props.term}, function (data) {
      this.setState({
        subContent: data.poem,
        replaced: data.replaced
      });
    }.bind(this)); 
  },

  componentWillReceiveProps: function (nextProps) {
    //To erase page before AJAX request enters new poem
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

  render: function () {

    return (
      <p>
        {this.state.subContent}
      </p>
    );
  }
});

module.exports = ArticleIntro;