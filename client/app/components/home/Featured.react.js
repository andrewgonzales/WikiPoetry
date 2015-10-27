var React = require('react');

var Featured = React.createClass({

  propTypes: {
    wikiData: React.PropTypes.string
  },

  render: function () {
    return (
      <div>
        <h4>Featured</h4>
        <p>
        {this.props.wikiData}
        </p>
      </div>
    );
  }
});

module.exports = Featured;
