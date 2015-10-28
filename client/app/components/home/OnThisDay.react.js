var React = require('react');
var BulletPoint = require('./BulletPoint.react');
var HomeImage = require('./HomeImage.react');

var OnThisDay = React.createClass({
  // propTypes: {
  //   wikiData: React.PropTypes.string
  // },

  getDate: function () {
    var d = new Date();
    var month = new Array();
    month[0] = 'January';
    month[1] = 'February';
    month[2] = 'March';
    month[3] = 'April';
    month[4] = 'May';
    month[5] = 'June';
    month[6] = 'July';
    month[7] = 'August';
    month[8] = 'September';
    month[9] = 'October';
    month[10] = 'November';
    month[11] = 'December';
    var n = month[d.getMonth()];
    var day = d.getDate();

    return n + ' ' + day;

  },

  render: function () {

    var text = this.props.text;
    var links = this.props.link;
    var picture = this.props.picture;

    return (
      <div>
        <h4>On This Day</h4>
        <div className="homeSectionContent">
          <HomeImage picture={picture}/>
          {this.getDate()}
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

module.exports = OnThisDay;
