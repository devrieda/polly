/** @jsx React.DOM */

var React = require('react');

var PollChoice = require('../models/poll_choice');
var PollChoiceForm = require('./poll_choice_form');

module.exports = React.createClass({
  getInitialState: function() {
    return {pollChoices: []}
  },

  componentWillMount: function() {
    PollChoice.all(this.props.pollId, function(choices) {
      this.setState({pollChoices: choices});
    }.bind(this));
  },

  render: function() {
    var pollChoices = [];
    for (var i=0; i <= this.state.pollChoices.length; i++) {
      var pollChoice = this.state.pollChoices[i];

      if (pollChoice !== undefined) {
        pollChoices.push(<PollChoiceForm choiceText={pollChoice.text} choiceId={pollChoice.id} />);
      }
    }

    return (
      <form className="poll-submission-form">
        <h2>{this.props.pollQuestion}</h2>
        <ul className="poll-choices">
          {pollChoices}
        </ul>
        <div className="buttons">
          <a href="#" className="button">Submit Answer</a>
        </div>
      </form>
    )
  }
});

