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
    WikiPoetryActionCreators.savePoem(this.props.wholeArticle);
    WikiPoetryActionCreators.editMode(this.state.editMode, this.props.keyIndex);
  },

  render: function () {
    var userPoem = this.props.userPoem;
    var poemKey;
     if (this.props.keyIndex.slice(-1) === '0') {
      poemKey = 'second';
    } else if (this.props.keyIndex.slice(-1) === '1') {
      poemKey = 'third';
    } else if (this.props.keyIndex.slice(-1) === '2') {
      poemKey = 'fourth';
    } else {
      poemKey = 'first';
    }
    var wholeArticle = this.props.wholeArticle;
    if (poemKey) {
      wholeArticle[poemKey].text = userPoem;
    }

    return (
      <form className="editPoem">
        <button onClick={this.savePoem} type="button" name ="saveButton">Save</button>
      </form>
    );
  }


});

module.exports = Save;