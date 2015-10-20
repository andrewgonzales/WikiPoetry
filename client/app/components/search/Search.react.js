
var React = require('react');

var Search = React.createClass({

  render: function () {
    return (
      <form className="searchForm" onSubmit={this._onSubmit}>
        <input className="searchBar" type="text" ref="search"/>
        <button type="submit" name="submitButton" >Search</button>
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
