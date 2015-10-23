var React = require('react');
var WikiPoetryActionCreators = require('../../actions/WikiPoetryActionCreators');

var Cartridge = React.createClass({

  render: function () {

    return (
      <form>
        <input type="radio" name="cartridge" value="shakespeare" id="shakespeare" onChange={this._onCartridgeChange} defaultChecked={true}/>
          <label htmlFor="shakespeare" name="cartridge">Shakespeare</label>
        <input type="radio" name="cartridge" value="bobdylan" id="bobDylan" onChange={this._onCartridgeChange}/>
          <label htmlFor="bobDylan" name="cartridge">Bob Dylan</label>
        <input type="radio" name="cartridge" value="tseliot" id="tsEliot" onChange={this._onCartridgeChange}/>
          <label htmlFor="tsEliot" name="cartridge">T.S. Eliot</label>
        <input type="radio" name="cartridge" value="sappho" id="sappho" onChange={this._onCartridgeChange}/>
          <label htmlFor="sappho" name="cartridge">Sappho</label>
        <input type="radio" name="cartridge" value="johnmilton" id="johnMilton" onChange={this._onCartridgeChange}/>
          <label htmlFor="johnMilton" name="cartridge">John Milton</label>
        <input type="radio" name="cartridge" value="johnkeats" id="johnKeats" onChange={this._onCartridgeChange}/>
          <label htmlFor="johnKeats" name="cartridge">John Keats</label>
        <input type="radio" name="cartridge" value="beatles" id="beatles" onChange={this._onCartridgeChange}/>
          <label htmlFor="beatles" name="cartridge">Beatles</label>
      </form>
    );
  },

  _onCartridgeChange: function (event) {
    WikiPoetryActionCreators.pickType(event.target.value);
  }
});

module.exports = Cartridge;
