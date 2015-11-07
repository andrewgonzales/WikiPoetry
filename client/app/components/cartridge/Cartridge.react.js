var React = require('react');
var WikiPoetryActionCreators = require('../../actions/WikiPoetryActionCreators');
var API = require('./../../api/wikiApi');
var WikiPoetryStore = require('../../stores/WikiPoetryStore');

var Cartridge = React.createClass({

  componentDidMount: function() {
    WikiPoetryStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    WikiPoetryStore.removeChangeListener(this._onChange);
  },

  render: function () {

    return (
      <form>
        <div>
        <input type="radio" name="cartridge" value="keats" id="keats" onChange={this._onCartridgeChange} defaultChecked={true}/>
          <label className="labels" htmlFor="keats" name="cartridge">John Keats</label>
        </div>
        <div>
        <input type="radio" name="cartridge" value="shakespeare" id="shakespeare" onChange={this._onCartridgeChange} />
          <label className="labels" htmlFor="shakespeare" name="cartridge">Shakespeare</label>
        </div>
        <div>
        <input type="radio" name="cartridge" value="frost" id="frost" onChange={this._onCartridgeChange}/>
          <label className="labels" htmlFor="frost" name="cartridge">Robert Frost</label>
        </div>
        <div>
        <input type="radio" name="cartridge" value="beatles" id="beatles" onChange={this._onCartridgeChange}/>
          <label className="labels" htmlFor="beatles" name="cartridge">The Beatles</label>
        </div>
        <div>
        <input type="radio" name="cartridge" value="user" id="user" onChange={this._onCartridgeChange}/>
          <label className="labels" htmlFor="user" name="cartridge">User</label>
        </div>
      </form>
    );
  },

  _onCartridgeChange: function (event) {
    if (event.target.value === 'user') {
      WikiPoetryActionCreators.getUserPoem(this.state.term);
    }
    WikiPoetryActionCreators.pickType(event.target.value);   
  },

  _onChange: function () {
    this.setState({
      term: WikiPoetryStore.getTerm()
    });
  }
});

module.exports = Cartridge;
