/** @jsx React.DOM */

var React = require('react');

var PollSession = require('../../models/poll_session');
var PollSubmission = require('../../models/poll_submission');
var Poll = require('../../models/poll');
var PollChoice = require('../../models/poll_choice');

var SubmitButton = require('../../components/submit_button');
var Spinner = require('../../components/spinner.js');
var RadioGroup = require('../../components/radio_group');
var RadioButton = require('../../components/radio_button');

module.exports = React.createClass({
  getInitialState: function() {
    return { poll: {},
             session: null,
             submission: {pollChoiceId: null},
             choices: [{id: -1, text: ""}, {id: -2, text: ""},
                       {id: -3, text: ""}, {id: -4, text: ""}], 
             saving: false,
             complete: false};
  },

  componentDidMount: function() {
    this.loadPollSession();
  },
  loadPollSession: function() {
    var sessionId = this.props.sessionId;
    var pollId = this.props.pollId;
    if (!sessionId || !pollId) { return; }

    PollSession.find(sessionId, pollId, this, function(session) {
      this.setState({session: session});
      if (session.pollSubmission) {
        this.setState({submission: session.pollSubmission});
      }
      this.loadPoll(pollId);
      this.loadPollChoices(pollId);
    });
  },
  loadPoll: function(pollId) {
    Poll.find(pollId, this, function(poll) {
      this.setState({poll: poll});
    });
  },
  loadPollChoices: function(pollId) {
    PollChoice.all(pollId, this, function(choices) {
      this.setState({choices: choices});
    });
  },

  handleChoiceChange: function(value) {
    var submission = this.state.submission;
    submission.pollChoiceId = value;
    this.setState({submission: submission});
  },
  handleSubmit: function() {
    this.setState({saving: true});

    var submission = new PollSubmission();
    submission.pollId = this.state.poll.id;
    submission.pollSessionId = this.state.session.id;
    submission.pollChoiceId = this.state.submission.pollChoiceId;
    submission.save(this, function(pollSubmission) {
      this.setState({submission: pollSubmission, saving: false, complete: true});
    });

    return false;
  },

  createLoadingSpinner: function() {
    return (
      <div className='poll-submission-spinner'><Spinner /></div>
    )
  },
  createSubmissionForm: function() {
    var pollChoices = this.state.choices.map(function(choice) {
      return <RadioButton className='poll-choice'
                              label={choice.text}
                              value={choice.id}
                                key={choice.id} />
    }.bind(this));

    return (
      <form className="poll-submission-form" onSubmit={this.handleSubmit}>
        <h2>{this.state.poll.question}</h2>
        <RadioGroup className='poll-choices'
                     onChange={this.handleChoiceChange}
                     readonly={this.state.submission.id}
                        value={this.state.submission.pollChoiceId}>
          {pollChoices}
        </RadioGroup>

        <SubmitButton disabled={!this.state.submission.pollChoiceId}
                      loading={this.state.saving}
                      complete={this.state.complete}
                      hidden={this.state.submission.id} />
      </form>
    )
  },
  render: function() {
    return !!this.state.poll.question ? this.createSubmissionForm() : this.createLoadingSpinner();
  }
});
