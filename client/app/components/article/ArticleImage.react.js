var React = require('react');

var ArticleImage = React.createClass({

  render: function () {

    return (
      <div className="imgContainer u-pull-right">
        <img src="https://pbs.twimg.com/profile_images/585897673544376320/-5fUjpSL.jpg"/>
      </div>
    );
  }
});

module.exports = ArticleImage;
