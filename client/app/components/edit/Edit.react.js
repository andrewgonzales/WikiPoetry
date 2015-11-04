var React = require('react');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom');
var API = require('./../../api/wikiApi');

var WikiPoetryStore = require('../../stores/WikiPoetryStore');
var WikiPoetryActionCreators = require('../../actions/WikiPoetryActionCreators');

var Edit = React.createClass({
  getInitialState: function () {
    return {
      editMode: true,
    }
  },

  editArticle: function () {
    event.preventDefault();
    this.setState({editMode: !this.state.editMode});
    //call action creator
    WikiPoetryActionCreators.editMode(this.state.editMode, this.props.keyIndex);
  },

  render: function () {
    return (
      <div className="editPoem">
        <button onClick={this.editArticle} type="button" name ="editButton">Edit</button>
      </div>
    );
  }, 

});

module.exports = Edit;