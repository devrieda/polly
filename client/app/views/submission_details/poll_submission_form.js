/** @jsx React.DOM */

var React = require('react');

var Poll = require('../../models/poll');
var PollChoice = require('../../models/poll_choice');
var PollSubmission = require('../../models/poll_submission');

var SubmitButton = require('../../components/submit_button');
var PollSubmissionChoice = require('./poll_submission_choice');
var Spinner = require('../../components/spinner.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {poll: {},
            pollChoices: [{id: -1, text: ""},
                          {id: -2, text: ""}]};
  },

  componentWillMount: function() {
    if (!this.props.pollId) { return; }

    Poll.find(this.props.pollId, this, function(poll) {
      PollChoice.all(this.props.pollId, this, function(choices) {
        this.setState({poll: poll, pollChoices: choices});
      });
    });

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
    submission.save(this, function() {
    });

    return false;
  },

  createSubmissionForm: function() {
    var pollChoices = this.state.pollChoices.map(function(choice) {
      return <PollSubmissionChoice key={choice.id}
                                pollId={this.props.pollId}
                            choiceText={choice.text}
                              choiceId={choice.id}
                        onChoiceChange={this.handleChoiceChange} />
    }.bind(this));

    var disabled = !this.state.pollChoiceId;

    return (
      <form className="poll-submission-form" onSubmit={this.handleSubmit}>
        <h2>{this.state.poll.question}</h2>
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
    return (!!this.state.poll.question) ? this.createSubmissionForm() : this.createLoadingSpinner();
  }
});
