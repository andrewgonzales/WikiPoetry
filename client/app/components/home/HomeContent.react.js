var React = require('react');
var Featured = require('./Featured.react');
var InTheNews = require('./InTheNews.react');
var DidYouKnow = require('./DidYouKnow.react');
var OnThisDay = require('./OnThisDay.react');
var $ = require('jquery');


var HomeContent = React.createClass({
  //set initial state
  getInitialState: function () {
    return {};
  },
  //Let components render first then perform AJAX request
  componentDidMount: function () {
    $.ajax({
      url: '/api/rnn/wiki',
      type: 'GET',
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

  render: function () {
    return (
      <div>
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
  }
});

module.exports = HomeContent;
