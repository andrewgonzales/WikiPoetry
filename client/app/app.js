var React = require('react');
var ReactDOM = require('react-dom');
var WikiPoetryApp = require('./components/WikiPoetryApp.react')


// Render FluxCartApp Controller View
ReactDOM.render(
  <WikiPoetryApp />,
  document.getElementById('flux-wiki')
);
