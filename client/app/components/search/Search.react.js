var React = require('react');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom');
var API = require('./../../api/wikiApi');

var WikiPoetryStore = require('../../stores/WikiPoetryStore');
var WikiPoetryActionCreators = require('../../actions/WikiPoetryActionCreators');
var ArticleSubsection = require('../article/ArticleSubsection.react');

function getSearchState() {
  return {
    type: WikiPoetryStore.getType(),
    term: WikiPoetryStore.getTerm(),
    load: WikiPoetryStore.getLoad()
  }
}

function getArticleContent() {
  return WikiPoetryStore.getArticle();
}

var Search = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function () {
    return getSearchState();
  },

  componentDidMount: function() {
    WikiPoetryStore.addChangeListener(this._onChange);
    WikiPoetryStore.addArticleListener(this._onArticleChange);
    WikiPoetryStore.addTypeListener(this._onType);
  },

  componentWillUnmount: function() {
    WikiPoetryStore.removeChangeListener(this._onChange);
    WikiPoetryStore.removeArticleListener(this._onArticleChange);
    WikiPoetryStore.removeTypeListener(this._onType);
  },

  render: function () {
    var loadGif;
    if(this.state.load) {
      loadGif = <button type="submit" name="submitButton" disabled>Search</button>;
    } else {
      loadGif =  <button type="submit" name="submitButton">Search</button>
    }

    return (
      <form className="searchForm" onSubmit={this._onSubmit}>
        <input className="searchBar" type="search" placeholder="Search" ref="search" required/>
        {loadGif}
      </form>
    );
  },

  _onSubmit: function(event) {
    event.preventDefault();
    var search = this.refs.search.value.trim();
    
    //Send value to server before erasing it!
    WikiPoetryActionCreators.submitSearch(search);
    WikiPoetryActionCreators.getArticleContent(this.state.type, search);
    this.setState({
      load: WikiPoetryStore.getLoad()
    });

    this.refs.search.value = '';
  },

  _onArticleChange: function () {
    this.setState(getArticleContent());
    this.setState(getSearchState());
    this.setState({
      load: WikiPoetryStore.getLoad()
    });
    if (this.state.term) {
      this.history.pushState(getArticleContent(), '/Article/' + this.state.term, null);
    }
  },

  _onChange: function(event) {
    this.setState(getSearchState());
  },

  _onType: function () {
    this.setState({
      type: WikiPoetryStore.getType(),
      load: WikiPoetryStore.getLoad()
    })
  }
});

module.exports = Search;
