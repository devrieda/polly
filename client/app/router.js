/** @jsx React.DOM */

var React = require('react')
var ReactRouter = require('react-nested-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route

var env = require('../config/env')

var App = React.createClass({
  render: function () {
    return <div className="app">{this.props.activeRoute}</div>
  }
})

var router = Router(
  <Route handler={App}>
    <Route name="splash" path="/" handler={require('./views/splash')} />
    <Route name="pollsIndex" path="/polls" handler={require('./views/polls_index')} />
  </Route>
)

module.exports = router
