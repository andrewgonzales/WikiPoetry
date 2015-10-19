var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route

var history = require('history');
var useBasename = history.useBasename;
var createHistory = history.createHistory;

var WikiPoetryApp = require('./components/WikiPoetryApp.react');
var Home = require('./components/Home.react');
var Article = require('./components/Article.react');
//Perform routing
var base = useBasename(createHistory)({
  basename: '/wikiPoetry'
});


// Render FluxCartApp Controller View
ReactDOM.render(
  <Router history={base}>
    <Route path="/" component={WikiPoetryApp}>
      <Route path="Home" component={Home} />
      <Route path="Article" component={Article} />
    </Route>
  </Router>, wiki);