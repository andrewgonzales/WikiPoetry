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
        <input type="radio" name="cartridge" value="keats" id="keats" onChange={this._onCartridgeChange} defaultChecked={true}/>
          <label htmlFor="keats" name="cartridge">John Keats</label>
        <input type="radio" name="cartridge" value="shakespeare" id="shakespeare" onChange={this._onCartridgeChange} />
          <label htmlFor="shakespeare" name="cartridge">Shakespeare</label>
        <input type="radio" name="cartridge" value="dylan" id="Dylan" onChange={this._onCartridgeChange}/>
          <label htmlFor="Dylan" name="cartridge">Bob Dylan</label>
        <input type="radio" name="cartridge" value="sappho" id="sappho" onChange={this._onCartridgeChange}/>
          <label htmlFor="sappho" name="cartridge">Sappho</label>
        <input type="radio" name="cartridge" value="johnmilton" id="johnMilton" onChange={this._onCartridgeChange}/>
          <label htmlFor="johnMilton" name="cartridge">John Milton</label>
        <input type="radio" name="cartridge" value="beatles" id="beatles" onChange={this._onCartridgeChange}/>
          <label htmlFor="beatles" name="cartridge">Beatles</label>
        <input type="radio" name="cartridge" value="user" id="user" onChange={this._onCartridgeChange}/>
          <label htmlFor="user" name="cartridge">User</label>
      </form>
    );
  },

  _onCartridgeChange: function (event) {
    if (event.target.value === 'user') {
      WikiPoetryActionCreators.getUserPoem(this.state.term)
    } else {
      WikiPoetryActionCreators.pickType(event.target.value);
    }
  },

  _onChange: function () {
    this.setState({
      term: WikiPoetryStore.getTerm()
    });
  }
});

module.exports = Cartridge;
