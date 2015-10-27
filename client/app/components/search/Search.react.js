
var React = require('react');
var ReactRouter = require('react-router');
var API = require('./../../api/wikiApi');

var WikiPoetryStore = require('../../stores/WikiPoetryStore');

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
    var json = {
      'text': search,
      'type': this.state.type
    };

    API.getArticle(json, function(data) {
      this.history.pushState({text: data}, '/Article/' + search, null );
    }.bind(this));
    this.refs.search.value = '';
  },

  _onChange: function() {
    this.setState(getSearchState());
  }

});

module.exports = Search;
