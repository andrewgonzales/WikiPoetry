var React = require('react');
var Featured = require('./Featured.react');
var InTheNews = require('./InTheNews.react');
var DidYouKnow = require('./DidYouKnow.react');
var OnThisDay = require('./OnThisDay.react');

var HomeContent = React.createClass({
  render: function () {
    return (
      <div>
        <section className="leftarticlegroup six columns">
          <article className="homearticle featured">
            <Featured />
          </article>
          <article className="homearticle inthenews">
            <DidYouKnow />
          </article>
        </section>
        <section className="rightarticlegroup row six columns">
          <article className="homearticle didyouknow">
            <InTheNews />
          </article>
          <article className="homearticle onthisday">
            <OnThisDay />
          </article>
        </section>
      </div>
    );
  }
});

module.exports = HomeContent;
