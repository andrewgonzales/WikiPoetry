var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var API = require('./../../api/wikiApi');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');
//Listener is in HomeContent
var WikiPoetryActionCreators = require('../../actions/WikiPoetryActionCreators');


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

  handleClick: function (event) {
    var search = this.props.link;

    WikiPoetryActionCreators.submitSearch(search);
    WikiPoetryActionCreators.getArticleContent(this.state.type, search)
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
