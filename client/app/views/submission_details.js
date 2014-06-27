/** @jsx React.DOM */

var React = require('react');

var PollSession = require('../models/poll_session');
var Poll = require('../models/poll');
var PollChoice = require('../models/poll_choice');

var PollSubmissionForm = require('./submission_details/poll_submission_form');
var PollSubmissionResults = require('./submission_details/poll_submission_results');
var NoPolls = require('./submission_details/no_polls');
var Spinner = require('../components/spinner');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      session: null, poll: {}, choices: []
    };
  },

  componentWillMount: function() {
    this.loadPollSession();
  },
  loadPollSession: function() {
    var sessionId = this.props.params.sessionId;
    var pollId = this.props.params.pollId;
    if (!sessionId || !pollId) { return; }

    PollSession.find(sessionId, pollId, this, function(session) {
      this.setState({session: session});
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

  createSpinner: function() {
    return (
      <div className='poll-submission-spinner'><Spinner /></div>
    )
  },

  render: function() {
    var output;

    if (!this.props.loaded) {
      return this.createSpinner();
    }
    if (!this.props.params.pollId) {
      return <NoPolls />
    }
    if (!this.state.session) {
      return this.createSpinner();
    }

    if (this.state.session.hasSubmitted) {
      output = <PollSubmissionResults poll={this.state.poll}
                                   session={this.state.session}
                                   choices={this.state.choices} />
    } else {
      output = <PollSubmissionForm poll={this.state.poll}
                                session={this.state.session}
                                choices={this.state.choices} />
    }

    return output
  }

});
