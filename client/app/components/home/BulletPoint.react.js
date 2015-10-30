var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var API = require('./../../api/wikiApi');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');

var BulletPoint = React.createClass({
  mixins: [ReactRouter.History],

  getInitialState: function () {
    return {
      type: WikiPoetryStore.getType()
    }
  },

  makeBulletPoint: function(blurb, linkedWord) {
    var length = linkedWord.length;
    var linkedWordIndex = blurb.search(linkedWord);
    before = blurb.slice(0, linkedWordIndex);
    after = blurb.slice(linkedWordIndex + length);
    return [before, after];
  },

  handleClick: function () {
    var search = this.props.link;

    API.getArticlePage(this.state.type, search, function (data) {
      data.term = search;
      this.history.pushState(data, '/Article/' + search, null );
    }.bind(this));
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
        <p>{[beforeLink, 
          <a key={1} onClick={this.handleClick} href="#" activeClassName="link-active">{linkedWord}</a>,
           afterLink]}
        </p>
      </li>
    );
  }
});

module.exports = BulletPoint;
