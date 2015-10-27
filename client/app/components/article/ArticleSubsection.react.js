var React = require('react');

var ArticleSubsection = React.createClass({

  render: function () {
    return (
      <div className="subsection">
        <div className="input">{this.props.error}</div>
        <h4 className="subheading">{this.props.subheading}</h4>
        <p className="subcontent">{this.props.subcontent}</p>
      </div>
    );
  }
});

module.exports = ArticleSubsection;
