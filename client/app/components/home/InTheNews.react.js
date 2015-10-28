var React = require('react');
var BulletPoint = require('./BulletPoint.react');
var HomeImage = require('./HomeImage.react');

var InTheNews = React.createClass({
  // propTypes: {
  //   wikiData: React.PropTypes.string
  // },

  render: function () {

    var text = this.props.text;
    var links = this.props.link;
    var picture = this.props.picture;

    return (
      <div>
        <h4>In The News</h4>
        <div className="homeSectionContent">
          <HomeImage picture={picture}/>
          <ul>
            {text.map(function(point, i) {
              return (//<li key={'point' + i}>{point}</li>
                <div key={'point' + i}>
                  <BulletPoint
                    blurb={point}
                    link={links[i]} />
                </div>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = InTheNews;
