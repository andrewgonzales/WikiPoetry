var React = require('react');
var HomeImage = require('./HomeImage.react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var API = require('./../../api/wikiApi');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');

var Featured = React.createClass({
  mixins: [ReactRouter.History],
  // propTypes: {
  //   wikiData: React.PropTypes.string
  // },

  getInitialState: function () {
    return {
      type: WikiPoetryStore.getType()
    }
  },

  split: function(blurb, linkedWord) {
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
          {[beforeLink, <a key={1} onClick={this.handleClick} href="#" activeClassName="link-active">{link}</a>,afterLink]}
          </p>
        </div>
      </div>
    );
  }
});

module.exports = Featured;
