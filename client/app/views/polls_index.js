/** @jsx React.DOM */

var React = require('react');
var Router = require('react-nested-router').Router

var Poll = require('../models/poll');

var DrawerLayout = require('./drawer_layout')

module.exports = React.createClass({
  render: function() {
    return (
      <DrawerLayout />
    )
  }
});
