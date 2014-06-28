/** @jsx React.DOM */

var React = require('react');

var PollSubmission = require('../../models/poll_submission');

var SubmitButton = require('../../components/submit_button');
var Spinner = require('../../components/spinner.js');
var RadioGroup = require('../../components/radio_group');
var RadioButton = require('../../components/radio_button');

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
    submission.pollId = this.props.poll.id;
    submission.pollSessionId = this.props.session.id;
    submission.pollChoiceId = choiceId;
    submission.save(this, function() {
    });

    return false;
  },

  createSubmissionForm: function() {

    var disabled = !this.state.pollChoiceId;

    var pollChoices = this.props.choices.map(function(choice) {
      return <RadioButton className='poll-choice' label={choice.text} value={choice.id} />
    }.bind(this));

    return (
      <form className="poll-submission-form" onSubmit={this.handleSubmit}>
        <h2>{this.props.poll.question}</h2>
        <RadioGroup className='poll-choices' onChange={this.handleChoiceChange}>
          {pollChoices}
        </RadioGroup>
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
