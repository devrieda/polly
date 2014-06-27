/** @jsx React.DOM */

var React = require('react');
var PollSubmissionForm = require('./submission_details/poll_submission_form');
var NoPolls = require('./submission_details/no_polls');
var Spinner = require('../components/spinner.js');

module.exports = React.createClass({

  render: function() {
    var output;

    if (this.props.loaded) {
      if (!this.props.params.pollId) {
        output = <NoPolls />
      } else {
        output = <PollSubmissionForm pollId={this.props.params.pollId}
                                     sessionId={this.props.params.sessionId} />
      }
    } else {
      output = (
        <div className='poll-submission-spinner'>
          <Spinner />
        </div>
      )
    }
    return output;
  }

});
