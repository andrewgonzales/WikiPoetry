var React = require('react');

var Featured = React.createClass({

  propTypes: {
    wikiData: React.PropTypes.string
  },

  render: function () {
    // console.log(this.props.wikiData);
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
