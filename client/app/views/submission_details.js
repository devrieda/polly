/** @jsx React.DOM */

var React = require('react');
var PollSubmissionForm = require('./submission_details/poll_submission_form');
var NoPolls = require('./submission_details/no_polls');
var Spinner = require('../components/spinner');
var PollSession = require('../models/poll_session');
var PollSubmissionResults = require('./submission_details/poll_submission_results');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      session: undefined
    }
  },

  componentWillMount: function() {
    var sessionId = this.props.params.sessionId;
    var pollId = this.props.params.pollId;
    if (!sessionId || !pollId) { return; }
    PollSession.find(sessionId, pollId, this, function(session) {
      this.setState({
        session: session
      });
    });

  },

  createSpinner: function() {
    return (
      <div>
        <div className='poll-submission-spinner'>
        <Spinner />
        </div>
      </div>
    )
  },

  render: function() {
    var output;

    if (this.props.loaded) {
      if (!this.props.params.pollId) {
        output = <NoPolls />
      } else {
        if (this.state.session) {
          if (this.state.session.hasSubmitted) {
            output = <PollSubmissionResults submission={this.state.session} />
          } else {
            output = <PollSubmissionForm pollId={this.props.params.pollId} />
          }
        } else {
          output = this.createSpinner();
        }
      }
    } else {
      output = this.createSpinner();
    }

    return output
  }

});
