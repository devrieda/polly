/** @jsx React.DOM */

var React = require('react')
var Router = require('react-nested-router').Router

var poll = require('../models/poll');

module.exports = React.createClass({

  componentWillMount: function() {
    // load polls
  },

  render: function() {
    return (
      <div>
        <h1>Polly React App!</h1>
        <div>Your polls listed here...soon</div>
      </div>
    )
  }
});
