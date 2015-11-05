var React = require('react');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom');
var API = require('./../../api/wikiApi');

var WikiPoetryStore = require('../../stores/WikiPoetryStore');
var WikiPoetryActionCreators = require('../../actions/WikiPoetryActionCreators');

var Save = React.createClass({
  getInitialState: function () {
    return {
      editMode: false,
    }
  },

  savePoem: function () {
    event.preventDefault();
    this.setState({editMode: !this.state.editMode});
    //call action creator
    console.log('save editMode: ', this.state.editMode);
    // WikiPoetryActionCreators.savePoem(this.state.editMode, this.props.keyIndex);
    WikiPoetryActionCreators.editMode(this.state.editMode, this.props.keyIndex);
  },

  render: function () {
    return (
      <form className="editPoem">
        <button onClick={this.savePoem} type="button" name ="saveButton">Save</button>
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