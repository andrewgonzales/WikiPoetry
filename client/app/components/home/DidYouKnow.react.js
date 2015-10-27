var React = require('react');

var DidYouKnow = React.createClass({

  propTypes: {
    wikiData: React.PropTypes.string
  },

  render: function () {
    return (
      <div>
        <h4>Did You Know</h4>
        <p>
        {this.props.wikiData}
        </p>
      </div>
    );
  }
});

module.exports = DidYouKnow;
