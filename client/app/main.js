var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route
//for history within browser
// var history = require('history');
// var useBasename = history.useBasename;
// var createHistory = history.createHistory;
//require route file
var routes = require('./routes');


// //Perform routing
// var base = useBasename(createHistory)({
//   basename: '/#'
// });


// Render FluxCartApp Controller View
ReactDOM.render(
  <Router>
  {routes}
  </Router>, wiki);
