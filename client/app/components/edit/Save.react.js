var React = require('react');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom');
var API = require('./../../api/wikiApi');

var Save = React.createClass({
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
      <form className="editPoem" onSubmit={this._onSubmit}>
        <button type="submit" name ="saveButton">Save</button>
      </form>
    );
  }, 

   _onSubmit: function(event) {
    event.preventDefault();
    //TODO
    //WikiPoetryActionCreators.save
  },

});

module.exports = Save;