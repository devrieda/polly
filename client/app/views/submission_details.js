/** @jsx React.DOM */

var React = require('react');

var PollSubmissionForm = require('./submission_details/poll_submission_form');
var NoPolls = require('./submission_details/no_polls');

module.exports = React.createClass({

  render: function() {
    if (this.props.loaded && !this.props.params.pollId) {
      return <NoPolls />
    }

    return <PollSubmissionForm pollId={this.props.params.pollId}
                            sessionId={this.props.params.sessionId} />
  }

});
