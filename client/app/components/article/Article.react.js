//Main template of all articles on page
//Should we serve a random poem when user clicks this link?
//

var React = require('react');
var $ = require('jquery');

var ArticleSubsection = require('./ArticleSubsection.react');
var ArticleImage = require('./ArticleImage.react');

var Article = React.createClass({

  getInitialState: function () {
    return {
      poemData: {
        mainTitle: '',
        summaryPoem: '',
        subheading1: '',
        subPoem1: '',
        subheading2: '',
        subPoem2: ''
      }
    }
  },

  setPoemState: function () {

    // $.ajax({
    //   url: '/api/rnn/article',
    //   type: 'GET',
    //   data: json,
    //   success: function(data) {
    //     console.log('search term sent');
    //     this.history.pushState({text: data}, '/Article/' + search, null );

    //   }.bind(this),
    //   error: function(xhr, status, err) {
    //     console.log(status) ;
    //     console.log(err.toString());
    //     console.log(xhr)
    //   }
    // });
    // return this.setState({poemData: this.state.poemData})
  },

  render: function () {
    //To handle the direct article link when there is no output

    // var Poem;
    // if (this.props.location.state !== null) {
    //   Poem = this.props.location.state.text;
    // } else {
    //   Poem = "Please search for a term";
    // }

    return (
      <div className="ten columns">
        <div className="article-container">
          <h3 className="article-title">Main Heading/*{this.state.poemData.mainTitle}*/</h3>
          <ArticleImage />
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat quas nihil aliquam esse odio recusandae consequuntur laudantium asperiores, illo ipsam assumenda, similique consectetur mollitia minus officia, dolores suscipit, id numquam quasi qui quae hic sint vitae? Praesentium architecto incidunt optio numquam qui iure consequatur quae, commodi placeat repellat, magni, debitis cumque fugit minima. Porro tempora, ullam, atque aliquid laudantium assumenda, eius explicabo autem non minus eaque cum excepturi provident. Labore!/*{this.state.poemData.summaryPoem}*/</p>
          <ArticleSubsection
            subheading={this.state.poemData.subheading1}
            subcontent={this.state.poemData.subPoem1} />
          <ArticleSubsection
            subheading={this.state.poemData.subheading2}
            subcontent={this.state.poemData.subPoem2} />
        </div>
      </div>
    );
  }
});

module.exports = Article;
