var React = require('react');

var ArticleSubsection = React.createClass({

  // propTypes: {
  //   subheading: React.propTypes.string.isRequired,
  //   subcontent: React.propTypes.string.isRequired,
  //   error: React.propTypes.string
  // },

  render: function () {
    return (
      <div className="subsection">
        <div className="input">{this.props.error}</div>
        <h4 className="subheading">Subheading/*{this.props.subheading}*/</h4>
        <p className="subcontent">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat quas nihil aliquam esse odio recusandae consequuntur laudantium asperiores, illo ipsam assumenda, similique consectetur mollitia minus officia, dolores suscipit, id numquam quasi qui quae hic sint vitae? Praesentium architecto incidunt optio numquam qui iure consequatur quae, commodi placeat repellat, magni, debitis cumque fugit minima. Porro tempora, ullam, atque aliquid laudantium assumenda, eius explicabo autem non minus eaque cum excepturi provident. Labore!/*{this.props.subcontent}*/</p>
      </div>
    );
  }
});

module.exports = ArticleSubsection;
