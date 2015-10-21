var React = require('react');
var Banner = require('./Banner.react');
var HomeContent = require('./HomeContent.react');

var Home = React.createClass({
  render: function () {
    return (
      <div className="homecontent ten columns">
        <section className="banner">
          <Banner />
        </section>
        <section className="homecontent">
          <HomeContent />
        </section>
      </div>
    );
  }
});

module.exports = Home;
