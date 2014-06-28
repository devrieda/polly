/** @jsx React.DOM */

var React = require('react');

var PollResultsChoice = require('./poll_results_choice');

module.exports = React.createClass({
  render: function() {
    var submission = this.props.session.pollSubmission;
    var pollChoices = this.props.choices.map(function(choice) {
      return <PollResultsChoice key={choice.id}
                         choiceText={choice.text}
                           selected={submission.pollChoiceId == choice.id}
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
