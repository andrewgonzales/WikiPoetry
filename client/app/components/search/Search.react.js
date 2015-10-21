
var React = require('react');

var Search = React.createClass({

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

    this.refs.search.value = '';
  }

});

module.exports = Search;
