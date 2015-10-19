var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route

var history = require('history');
var useBasename = history.useBasename;
var createHistory = history.createHistory;
//require files for routing
var WikiPoetryApp = require('./components/WikiPoetryApp.react');
var Home = require('./components/home/Home.react');
var Article = require('./components/article/Article.react');
var HowItWorks = require('./components/howitworks/HowItWorks.react');
var AboutUs = require('./components/aboutus/AboutUs.react');


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
      <Route path="HowItWorks" component={HowItWorks} />
      <Route path="AboutUs" component={AboutUs} />
    </Route>
  </Router>, wiki);