/** @jsx React.DOM */

var React = require('react');
var PollChoice = require('../models/poll_choice')

PollChoiceList = React.createClass({
  render: function() {
    return (
      <li>{this.props.text}</li>
    );
  }
});

module.exports = PollChoice;
