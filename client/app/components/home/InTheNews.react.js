var React = require('react');

var InTheNews = React.createClass({
  propTypes: {
    wikiData: React.PropTypes.string
  },

  render: function () {
    // console.log(this.props.wikiData);
    return (
      <div>
        <h4>In The News</h4>
        <p>
        {this.props.wikiData}
        </p>
      </div>
    );
  }
});

module.exports = InTheNews;
