/** @jsx React.DOM */

var React = require('react');

var PollSubmission = require('../../models/poll_submission');

var SubmitButton = require('../../components/submit_button');
var PollSubmissionChoice = require('./poll_submission_choice');
var Spinner = require('../../components/spinner.js');

module.exports = React.createClass({
  getInitialState: function() {
    return { pollChoiceId: null };
  },

  handleChoiceChange: function(value) {
    this.setState({pollChoiceId: value});
  },
  handleSubmit: function() {
    var choiceId = this.state.pollChoiceId;

    // disable poll while we submit
    this.setState({pollChoiceId: null})

    var submission = new PollSubmission();
    submission.pollId = this.props.pollId;
    submission.pollSessionId = this.props.sessionId;
    submission.pollChoiceId = choiceId;
    submission.save(this, function() {});

    return false;
  },

  createSubmissionForm: function() {
    var pollChoices = this.props.choices.map(function(choice) {
      return <PollSubmissionChoice key={choice.id}
                                pollId={this.props.pollId}
                            choiceText={choice.text}
                              choiceId={choice.id}
                        onChoiceChange={this.handleChoiceChange} />
    }.bind(this));

    var disabled = !this.state.pollChoiceId;

    return (
      <form className="poll-submission-form" onSubmit={this.handleSubmit}>
        <h2>{this.props.poll.question}</h2>
        <ul className="poll-choices">
          {pollChoices}
        </ul>
        <div className="buttons">
          <SubmitButton disabled={disabled}/>
        </div>
      </form>
    )
  },

  createLoadingSpinner: function() {
    return (
      <div className='poll-submission-spinner'>
        <Spinner />
      </div>
    )
  },

  render: function() {
    return (!!this.props.poll.question) ? this.createSubmissionForm() : this.createLoadingSpinner();
  }
});
