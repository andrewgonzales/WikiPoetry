var React = require('react');
var WikiPoetryActionCreators = require('../../actions/WikiPoetryActionCreators');
var API = require('./../../api/wikiApi');

var Cartridge = React.createClass({

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
    WikiPoetryActionCreators.pickType(event.target.value);
  }
});

module.exports = Cartridge;
