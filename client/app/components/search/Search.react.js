
var React = require('react');
var ReactRouter = require('react-router');
var $ = require('jquery');

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
    $.ajax({
      url: '/api/rnn',
      type: 'GET',
      data: json,
      success: function(data) {
        console.log('search term sent');
        this.history.pushState({text: data}, '/Article/' + search, null );
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(status) ;
        console.log(err.toString());
        console.log(xhr)
      }
    });

    this.refs.search.value = '';
  },

  _onChange: function() {
    this.setState(getSearchState());
  }

});

module.exports = Search;
