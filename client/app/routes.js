var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Redirect = ReactRouter.Redirect;

//Required files for routing
var WikiPoetryApp = require('./components/WikiPoetryApp.react');
var Home = require('./components/home/Home.react');
var Article = require('./components/article/Article.react');
var HowItWorks = require('./components/howitworks/HowItWorks.react');
var AboutUs = require('./components/aboutus/AboutUs.react');
var Login = require('./components/auth/Login.react');
var Signup = require('./components/auth/Signup.react');

var routes = (
  <Route path="/" component={WikiPoetryApp}>
    <IndexRoute component={Home} />
    <Route path="Article/:term" component={Article} />
    <Route path="HowItWorks" component={HowItWorks} />
    <Route path="AboutUs" component={AboutUs} />
    <Route path="Login" component={Login} />
    <Route path="Signup" component={Signup} />
    <Redirect from="*" to="/" />
  </Route>
);

module.exports = routes;
