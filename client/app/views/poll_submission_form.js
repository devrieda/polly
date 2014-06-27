/** @jsx React.DOM */

var React = require('react');

var Poll = require('../models/poll');
var PollChoice = require('../models/poll_choice');

var Spinner = require('../components/spinner');
var PollSubmissionChoice = require('./poll_submission_choice');

module.exports = React.createClass({
  getInitialState: function() {
    return {poll: {question: "Loading..."},
            pollChoices: [{id: -1, text: ""},
                          {id: -2, text: ""}]};
  },

  componentWillMount: function() {
    if (!this.props.pollId) { return; }

    Poll.find(this.props.pollId, this, function(poll) {
      this.setState({poll: poll});
    });

    PollChoice.all(this.props.pollId, this, function(choices) {
      this.setState({pollChoices: choices});
    });
  },

  handleChoiceChange: function(value) {
    this.setState({pollChoiceId: value});
  },
  handleSubmit: function() {
    var choiceId = this.state.pollChoiceId;

    console.log(choiceId)
    // TODO - send poll submission. we need the session first though

    this.setState({pollChoiceId: null})
    return false;
  },

  render: function() {
    var pollChoices = this.state.pollChoices.map(function(choice) {
      return <PollSubmissionChoice key={choice.id}
                                pollId={this.props.pollId}
                            choiceText={choice.text}
                              choiceId={choice.id}
                        onChoiceChange={this.handleChoiceChange} />
    }.bind(this));

    var disabled = this.state.pollChoiceId ? "" : "disabled"

    return (
      <form className="poll-submission-form" onSubmit={this.handleSubmit}>
        <h2>{this.state.poll.question}</h2>
        <ul className="poll-choices">
          {pollChoices}
        </ul>
        <div className="buttons">
          <input type="submit" className={"button " + disabled} value="Submit Answer" />
        </div>
      </form>
    )
  }
});
