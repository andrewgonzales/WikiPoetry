var React = require('react');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom');
var API = require('./../../api/wikiApi');

var Edit = React.createClass({
  // getInitialState: function () {
  //   //TODO
  // },

  // componentDidMount: function () {
  //   //TODO
  // },

  // componentWillUnmount: function () {
  //   //TODO
  // },

  render: function () {
    return (
      <form className="editForm" onSubmit={this._onSubmit}>
        <button type="submit" name ="editButton">Edit</button>
      </form>
    );
  }, 

   _onSubmit: function(event) {
    event.preventDefault();
    //TODO
    //WikiPoetryActionCreators.edit
  },

});

module.exports = Edit;