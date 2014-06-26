/** @jsx React.DOM */

var React = require('react');
var PollChoice = require('../models/poll_choice')

module.exports = React.createClass({
  render: function() {
    return (
      <li className="poll-choice">
        <label htmlFor="">
          <input type="radio" name="poll_1" id="choice_{this.props.choiceId}" />
          {this.props.choice_text}
        </label>
      </li>
    );
  }
});

