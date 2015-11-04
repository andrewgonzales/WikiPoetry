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
  }
}

var Search = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function () {
    return getSearchState();
  },

  componentDidMount: function() {
    WikiPoetryStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    WikiPoetryStore.removeChangeListener(this._onChange);
  },

  render: function () {
    return (
      <form className="searchForm" onSubmit={this._onSubmit}>
        <input className="searchBar" type="search" placeholder="Search" ref="search"/>
        <button type="submit" name="submitButton">Search</button>
      </form>
    );
  },

  _onSubmit: function(event) {
    event.preventDefault();
    var search = this.refs.search.value.trim();
    //Send value to server before erasing it!
    API.getArticlePage(this.state.type, search, function (data) {
      data.term = search;
      this.history.pushState(data, '/Article/' + search, null );
    }.bind(this));
    
    WikiPoetryActionCreators.submitSearch(search);

    this.refs.search.value = '';
  },

  _onChange: function(event) {
    this.setState(getSearchState());
  }

});

module.exports = Search;
