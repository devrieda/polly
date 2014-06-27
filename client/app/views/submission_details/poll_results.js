/** @jsx React.DOM */

var React = require('react');

var PollResultsChoice = require('./poll_results_choice');

module.exports = React.createClass({
  render: function() {
    var pollChoices = this.props.choices.map(function(choice) {
      return <PollResultsChoice key={choice.id}
                         choiceText={choice.text}
                           choiceId={choice.id} />
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
