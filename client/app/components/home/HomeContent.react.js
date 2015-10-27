var React = require('react');
var Featured = require('./Featured.react');
var InTheNews = require('./InTheNews.react');
var DidYouKnow = require('./DidYouKnow.react');
var OnThisDay = require('./OnThisDay.react');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');
var API = require('./../../api/wikiApi');

function getHomeState() {
  return {type: WikiPoetryStore.getType()};
}

var HomeContent = React.createClass({
  //set initial state
  getInitialState: function () {
    return getHomeState();
  },

  //Let components render first then perform AJAX request
  componentDidMount: function () {
    WikiPoetryStore.addChangeListener(this._onChange);
    API.getHomePage(this.state.type, function (data) {
      this.setState(data);
    }.bind(this));
  },

  componentWillUnmount: function() {
    WikiPoetryStore.removeChangeListener(this._onChange);
  },

  render: function () {
    return (
      <div className="main-container">
        <section className="leftarticlegroup six columns">
          <article className="homearticle featured">
            <Featured wikiData={this.state.Featured}/>
          </article>
          <article className="homearticle inthenews">
            <DidYouKnow wikiData={this.state.DidYouKnow}/>
          </article>
        </section>
        <section className="rightarticlegroup row six columns">
          <article className="homearticle didyouknow">
            <InTheNews wikiData={this.state.InTheNews}/>
          </article>
          <article className="homearticle onthisday">
            <OnThisDay wikiData={this.state.OnThisDay}/>
          </article>
        </section>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getHomeState());
  }
});

module.exports = HomeContent;
