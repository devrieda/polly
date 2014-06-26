/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <li className="poll-choice">
        <label htmlFor="">
          <input type="radio" name="poll_1" id="choice_{this.props.choiceId}" />
          {this.props.choiceText}
        </label>
      </li>
    )
  }
});
