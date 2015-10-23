var React = require('react');
var Featured = require('./Featured.react');
var InTheNews = require('./InTheNews.react');
var DidYouKnow = require('./DidYouKnow.react');
var OnThisDay = require('./OnThisDay.react');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');

var $ = require('jquery');

function getHomeState() {
  return {
    type: WikiPoetryStore.getType(),
  }
}


var HomeContent = React.createClass({
  //set initial state
  getInitialState: function () {
    return getHomeState();
  },
  //Let components render first then perform AJAX request
  componentDidMount: function () {
    WikiPoetryStore.addChangeListener(this._onChange);
    $.ajax({
      url: '/api/rnn/home',
      type: 'GET',
      data: {type: this.state.type},
      success: function(data) {
        console.log('Wiki request sent');
        this.setState({
          Featured: data,
          DidYouKnow: data,
          InTheNews: data,
          OnThisDay: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(status) ;
        console.log(err.toString());
        console.log(xhr)
      }
    });
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
