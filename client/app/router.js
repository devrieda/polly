/** @jsx React.DOM */

var React = require('react')
var ReactRouter = require('react-nested-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route

var env = require('../config/env')

var App = React.createClass({
  render: function () {
    return <div>{this.props.activeRoute}</div>
  }
})

var router = Router(
  <Route handler={App}>
    <Route name="index" path="/" handler={require('./views/index')} />
  </Route>
)

module.exports = router
