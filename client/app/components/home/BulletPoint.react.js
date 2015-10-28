var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var BulletPoint = React.createClass({

  makeBulletPoint: function(blurb, linkedWord) {
    var length = linkedWord.length;
    var linkedWordIndex = blurb.search(linkedWord);
    before = blurb.slice(0, linkedWordIndex);
    after = blurb.slice(linkedWordIndex + length);
    return [before, after];
  },

  render: function () {
    var blurb = this.props.blurb;
    var link = this.props.link;
    var linkedWord = link;

    var beforeAfter = this.makeBulletPoint(blurb, linkedWord);
    var beforeLink = beforeAfter[0];
    var afterLink = beforeAfter[1];

    return (
      <li>
        <p>{[beforeLink, <Link key={1} to={`/Article/${linkedWord}`} activeClassName="link-active">{linkedWord}</Link>, afterLink]}</p>
      </li>
    );
  }
});

module.exports = BulletPoint;
