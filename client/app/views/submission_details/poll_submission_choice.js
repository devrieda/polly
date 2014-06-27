/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  handleCheck: function(event) {
    this.props.onChoiceChange(event.target.value);
  },

  render: function() {
    return (
      <li className="poll-choice">
        <label htmlFor={"choice_" + this.props.choiceId}>
          <input type="radio"
                 name={"poll_" + this.props.pollId}
                value={this.props.choiceId}
             onChange={this.handleCheck}
                   id={"choice_" + this.props.choiceId} />
          {this.props.choiceText}
        </label>
      </li>
    )
  }
});
