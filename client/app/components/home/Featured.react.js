var React = require('react');
var HomeImage = require('./HomeImage.react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Featured = React.createClass({

  // propTypes: {
  //   wikiData: React.PropTypes.string
  // },

  split: function(blurb, linkedWord) {
    var length = linkedWord.length;
    var linkedWordIndex = blurb.search(linkedWord);
    before = blurb.slice(0, linkedWordIndex);
    after = blurb.slice(linkedWordIndex + length);
    return [before, after];
  },

  render: function () {

    var picture = this.props.picture;
    var link = this.props.link;
    var text = this.props.text;
    var beforeAfter = this.split(text, link);
    var beforeLink = beforeAfter[0];
    var afterLink = beforeAfter[1];

    return (
      <div>
        <h4>Featured</h4>
        <div className="homeSectionContent">
          <HomeImage picture={picture} />
          <p>
          {[beforeLink, <Link key={1} to={`/Article/${link}`} activeClassName="link-active">{link}</Link>,afterLink]}
          </p>
        </div>
      </div>
    );
  }
});

module.exports = Featured;
