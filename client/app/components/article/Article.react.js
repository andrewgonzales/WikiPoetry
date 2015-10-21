//Main template of all articles on page
//Should we serve a random poem when user clicks this link?
//

var React = require('react');

var Article = React.createClass({

  render: function () {
    //To handle the direct article link when there is no output
    var Poem;
    if (this.props.location.state !== null) {
      Poem = this.props.location.state.text;
    } else {
      Poem = "Please search for a term";
    }
    return (
      <div>
        <h1>Article Main</h1>
        <div>
        {Poem}
        </div>
      </div>
    );
  }
});

module.exports = Article;
