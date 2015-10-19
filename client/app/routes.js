var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;

//Required files for routing
var WikiPoetryApp = require('./components/WikiPoetryApp.react');
var Home = require('./components/home/Home.react');
var Article = require('./components/article/Article.react');
var HowItWorks = require('./components/howitworks/HowItWorks.react');
var AboutUs = require('./components/aboutus/AboutUs.react');



var routes = (
  <Route path="/" component={WikiPoetryApp}>
    <Route path="Home" component={Home} />
    <Route path="Article" component={Article} />
    <Route path="HowItWorks" component={HowItWorks} />
    <Route path="AboutUs" component={AboutUs} />
  </Route>
);

module.exports = routes;
