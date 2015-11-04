var React = require('react');

var ArticleImage = React.createClass({

  render: function () {

    var picture = this.props.picture;
    var caption = this.props.pictureCaption;
    return (
      <div className="imgContainer u-pull-right">
        <img src={'http://' + picture}/>
        <p className='caption'>{caption}</p>
      </div>
    );
  }
});

module.exports = ArticleImage;
