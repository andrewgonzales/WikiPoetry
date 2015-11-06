var React = require('react');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');

var Spinner = React.createClass({

  getInitialState: function () {
    return {
      load: WikiPoetryStore.getLoad()
    }
  },

  componentDidMount: function () {
    WikiPoetryStore.addChangeListener(this._onChange);
    WikiPoetryStore.addArticleListener(this._onArticleChange);
    WikiPoetryStore.addTypeListener(this._onType);
  },

  componentWillUnmount: function () {
    WikiPoetryStore.removeChangeListener(this._onChange);
    WikiPoetryStore.removeArticleListener(this._onArticleChange);
    WikiPoetryStore.removeTypeListener(this._onType);
  },

  render: function () {
    var loadGif;
    var loadMessage;

    if(this.state.load) {
      loadMessage = <div className="u-pull-left seven columns message">Ashley is thinking</div>
      loadGif = <img className="u-pull-right five columns loading" src="../images/loading_dots.gif" />
    } else {
      loadGif = '';
      
    }

    return (
      <div className="u-pull-left eight columns">
        {loadMessage}{loadGif}
      </div>
    );
  },

  _onChange: function () {
    this.setState({
      load: WikiPoetryStore.getLoad()
    });
  },

  _onArticleChange: function () {
    this.setState({
      load: WikiPoetryStore.getLoad()
    });
  },

  _onType: function () {
    this.setState({
      load: WikiPoetryStore.getLoad()
    });
  }
});

module.exports = Spinner;