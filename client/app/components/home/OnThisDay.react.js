var React = require('react');

var OnThisDay = React.createClass({
  propTypes: {
    wikiData: React.PropTypes.string
  },

  render: function () {
    // console.log(this.props.wikiData);
    return (
      <div>
        <h4>On This Day</h4>
        <p>
        {this.props.wikiData}
        </p>
      </div>
    );
  }
});

module.exports = OnThisDay;
