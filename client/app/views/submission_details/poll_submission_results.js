/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  render: function() {
    var pollChoices = this.props.choices.map(function(choice) {
      return (
        <li key={choice.id} className="poll-choice">
          <label htmlFor={"choice_" + choice.id}>{choice.text}</label>
        </li>
      )
    }.bind(this));

    return (
      <form className="poll-submission-form">
        <h2>{this.props.poll.question}</h2>
        <ul className="poll-choices">
          {pollChoices}
        </ul>
      </form>
    )
  }
});
