//Main template of all articles on page
//Should we serve a random poem when user clicks this link?

var React = require('react');
var ReactRouter = require('react-router');
var ArticleSubsection = require('./ArticleSubsection.react');
var ArticleImage = require('./ArticleImage.react');
var ArticleIntro = require('./ArticleIntro.react');
var ArticleRedirect = require('./ArticleRedirect.react');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');
var WikiPoetryActionCreators = require('../../actions/WikiPoetryActionCreators');
var API = require('../../api/wikiApi');
var Edit = require('../edit/Edit.react');
var Save = require('../edit/Save.react');

var Article = React.createClass({

  mixins: [ReactRouter.History],

  getInitialState: function () {
    return {
      type: WikiPoetryStore.getType(),
      poems: WikiPoetryStore.getPoems(), 
      editMode: WikiPoetryStore.getMode()
    }
  },

  componentDidMount: function () {
    WikiPoetryStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    WikiPoetryStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var newInfo = this.props.location.state;
    var articleType = this.state.type;
    var poems = this.state.poems[0] ? this.state.poems : [{poem: 'Please wait'}];
    var articleIntro;

    if (newInfo.text) {
      //Page does not exist
      articleIntro = <ArticleRedirect text={newInfo.text}/>;
    } else {
      articleIntro = <ArticleIntro poem={newInfo.poemData[0].poem} links={newInfo.poemData[0].replaced } type={articleType} />;
    }
    
    var editing = this.state.editMode.editing;
    var button;
    editing ? button = <Save/> : button = <Edit keyIndex={'intro'}/>
    return (
      <div className="ten columns" id="article">
        <div className="article-container">
          <h3 className="article-title">{this.props.location.state.term}{button}</h3>
          <ArticleImage picture={newInfo.picture}  pictureCaption={newInfo.pictureCaption} />
          {articleIntro}
          {newInfo.headings.map(function (heading, i) {
          <ArticleIntro poem={newInfo.poemData[0].poem} links={newInfo.poemData[0].replaced } type={articleType} keyIndex={'intro'}/>
          {newInfo.headings.map(function (heading, i) { 
            return (
              <ArticleSubsection
                key={'heading' + i}
                keyIndex={'subsection' + i}
                subheading={heading}
                poem={newInfo.poemData[i + 1]}
                term={newInfo.term}
                type={articleType}/>
            );
          })}
        </div>
      </div>
    );
  },

  _onChange: function () {
    this.setState({
      type: WikiPoetryStore.getType(),
      term: WikiPoetryStore.getTerm(),
      poems: WikiPoetryStore.getPoems()
    });
  }
});

module.exports = Article;
