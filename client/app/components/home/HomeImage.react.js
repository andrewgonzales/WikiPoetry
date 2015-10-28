var React = require('react');

var HomeImage = React.createClass({

  render: function () {

    var picture = this.props.picture;

    return (
      <div className="homeImgContainer u-pull-right">
        <img src={'http://' + picture}/>
      </div>
    );
  }
});

module.exports = HomeImage;
