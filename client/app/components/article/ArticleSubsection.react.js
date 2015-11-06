var React = require('react');
var API = require('../../api/wikiApi');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');
var WikiPoetryActionCreators = require('../../actions/WikiPoetryActionCreators');
var ReactRouter = require('react-router');
var Edit = require('../edit/Edit.react');
var Save = require('../edit/Save.react');

function getArticleContent() {
  return WikiPoetryStore.getArticle();
}

var ArticleSubsection = React.createClass({

  mixins: [ReactRouter.History],

  getInitialState: function () {
    return {
      type: WikiPoetryStore.getType(),
      editMode: WikiPoetryStore.getMode(),
    }
  },

  componentDidMount: function () {
    WikiPoetryStore.addArticleListener(this._onChange);
    WikiPoetryStore.addEditListener(this._onEdit);
    WikiPoetryStore.addEditListener(this._onSave);
  },

  componentWillUnMount: function () {
    WikiPoetryStore.removeArticleListener(this._onChange);
    WikiPoetryStore.removeEditListener(this._onEdit);
    WikiPoetryStore.removeEditListener(this._onSave);
  },

  handleClick: function (event, word) {
    event.preventDefault();
    WikiPoetryActionCreators.submitSearch(word);
    if (this.state.type === 'user') {
      WikiPoetryActionCreators.getUserPoem(word);
    } else {
      WikiPoetryActionCreators.getArticleContent(this.state.type, word);
    }
  },

  linkifyArticle: function (content, links) {
    var words = content.split(' ');
    var index;
    var spaced = [];
    var linkedArray = words.map(function(word, i) {
      if (links.indexOf(word) !== -1) {
        index = links.indexOf(word);
        var linkedWord = React.createElement("a", {key: i, href: '#', onClick: function(e){this.handleClick(e, word)}.bind(this), activeClassName: "link-active"}, word);
        return linkedWord;
      } else {
        return word;
      }
    }.bind(this));
    linkedArray.forEach(function(strOrObj) {
      spaced.push(strOrObj);
      spaced.push(' ');
    });
    return spaced;
  },

  editText: function (event) {
    this.setState({value: event.target.value});
  },

  render: function () {
    var content = this.props.poem ? this.props.poem.poem : 'Please wait';
    var links = this.props.poem ? this.props.poem.replaced : [];
    var load = this.props.load;
    var linkedArticle;
    var displayPoem;
    var userTextArea;
    var button;
    var editing = this.state.editMode.editing;
    var poemKey;
    var wholeArticle = this.props.wholeArticle;
    if (content && !editing) {
      linkedArticle = this.linkifyArticle(content, links);
    }
    if (editing) {
      userTextArea = <textarea id="userPoem" name="userPoem" defaultValue={content} onChange={this.editText}></textarea>
      var userPoem = this.state.value;
      button = <Save keyIndex={this.props.keyIndex} wholeArticle={this.props.wholeArticle} userPoem={userPoem}/>
    } else if (!editing && !load) {
      displayPoem = linkedArticle;
    }
    else {
      displayPoem = '';
      button = <Edit keyIndex={this.props.keyIndex}/>
    }

    return (
      <div className="subsection">
        <div className="input">{this.props.error}</div>
        <h4 className="subheading">
          {this.props.subheading}
          {button}
        </h4>
        <p className="subcontent">{displayPoem}</p>
        <div>{userTextArea}</div>
      </div>
    );
  },

  _onChange: function () {
    console.log('article content: ',getArticleContent());
    if (this.state.term) {
      this.history.pushState(getArticleContent(), '/Article/' + this.state.term, null);
    }
  },

  _onEdit: function () {
    if (this.state.editMode.key === this.props.keyIndex) {
      this.setState({
        editMode: WikiPoetryStore.getMode()
      });
    }
  },

  _onSave: function () {
    if (this.state.editMode.key === this.props.keyIndex) {
      this.setState({
        editMode: WikiPoetryStore.getMode()
      });
    }
  }
});

module.exports = ArticleSubsection;

