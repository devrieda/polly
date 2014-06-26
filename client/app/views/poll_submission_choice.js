/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <li className="poll-choice">
        <label htmlFor={"choice_" + this.props.choiceId}>
          <input type="radio" name={"poll_" + this.props.pollId} id={"choice_" + this.props.choiceId} />
          {this.props.choiceText}
        </label>
      </li>
    )
  }
});
