
var React = require('react');
var ReactRouter = require('react-router');
var $ = require('jquery');

var Search = React.createClass({
  mixins: [ReactRouter.History],


  render: function () {
    return (
      <form className="searchForm" onSubmit={this._onSubmit}>
        <input className="searchBar" type="search" placeholder="Search" ref="search"/>
        <input className="searchButton" type="submit" name="submitButton"/>
      </form>
    );
  },

  _onSubmit: function(event) {
    event.preventDefault();
    var search = this.refs.search.value.trim();
    //Send value to server before erasing it!
    var json = {'text': search};
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
  }

});

module.exports = Search;
