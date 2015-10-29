var React = require('react');

var ArticleImage = React.createClass({

  render: function () {

    var picture = this.props.picture;
    return (
      <div className="imgContainer u-pull-right">
        <img src={'http://' + picture}/>
      </div>
    );
  }
});

module.exports = ArticleImage;
