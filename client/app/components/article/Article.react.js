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

var Article = React.createClass({

  mixins: [ReactRouter.History],

  getInitialState: function () {
    return {
      type: WikiPoetryStore.getType(),
      poems: WikiPoetryStore.getPoems(),
      load: WikiPoetryStore.getLoad()
    }
  },

  componentDidMount: function () {
    WikiPoetryStore.addChangeListener(this._onChange);
    WikiPoetryStore.addArticleListener(this._onArticleChange);
    WikiPoetryStore.addTypeListener(this._onType);
  },

  componentWillUnmount: function () {
    WikiPoetryStore.removeChangeListener(this._onChange);
    WikiPoetryStore.removeArticleListener(this._onArticleChange);
    WikiPoetryStore.removeTypeListener(this._onType);

  },

  handleClick: function (event) {
    event.preventDefault();
    WikiPoetryActionCreators.submitSearch(this.props.location.state.term);
    WikiPoetryActionCreators.getArticleContent(this.state.type, this.props.location.state.term);
    this.setState({
      load: WikiPoetryStore.getLoad()
    })
  },

  render: function () {
    var newInfo = this.props.location.state;
    var articleType = this.state.type;
    var poems = this.state.poems[0] ? this.state.poems : [{poem: 'Please wait'}];
    var load = this.state.load  
    var articleIntro;
    var loadGif;

    if(this.state.load && !newInfo.text) {
      loadGif = ''; 
    } else if (!newInfo.text && !this.state.load){
      loadGif = <button onClick={this.handleClick}>Generate new poems</button>
    } else {
      loadGif = <h2>Poem could not be generated...</h2>
    }

    if (newInfo.text) {
      //Page does not exist
      articleIntro = <ArticleRedirect text={newInfo.text}/>;
    } else {
      articleIntro = <ArticleIntro load={load} poem={newInfo.poemData[0].poem} links={newInfo.poemData[0].replaced } type={articleType} />;
    }
    
    return (
      <div className="ten columns" id="article">
        <div className="article-container">
          {loadGif}
          <h3 className="article-title">{this.props.location.state.term}</h3>
          <ArticleImage picture={newInfo.picture}  pictureCaption={newInfo.pictureCaption} />
          {articleIntro}
          {newInfo.headings.map(function (heading, i) {
            return (
              <ArticleSubsection
                key={'heading' + i}
                subheading={heading}
                poem={newInfo.poemData[i + 1]}
                term={newInfo.term}
                type={articleType}
                load={load}/>
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
  },

  _onArticleChange: function () {
    this.setState({
      load: WikiPoetryStore.getLoad()
    })
  },

  _onType: function () {
    this.setState({
      type: WikiPoetryStore.getType(),
      load: WikiPoetryStore.getLoad()
    })
    WikiPoetryActionCreators.getArticleContent(WikiPoetryStore.getType(), this.props.location.state.term);
  }
});

module.exports = Article;
