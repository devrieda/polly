/** @jsx React.DOM */
var $ = require('jquery');
var env = require('../../config/env');

var React = require('react');

var PollChoice = require('../models/poll_choice');
var PollChoiceForm = require('./poll_choice_form');

module.exports = React.createClass({
  getInitialState: function() {
    return {poll_choices: []}
  },

  componentWillMount: function() {
    $.ajax({
      dataType: 'json',
      url: env.API_HOST + "/" + env.API_NAMESPACE + "/polls/" + this.props.poll_id + "/poll_choices",

      success: function(data) {
        this.setState({poll_choices: data['poll_choices']});
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(env.API_HOST, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    var poll_choices = [];
    for (var i=0; i <= this.state.poll_choices.length; i++) {
      var poll_choice = this.state.poll_choices[i];

      if (poll_choice !== undefined) {
        poll_choices.push(<PollChoiceForm choice_text={poll_choice.text} choice_id={poll_choice.id} />);
      }
    }

    return (
      <form className="poll-submission-form">
        <h2>{this.props.poll_question}</h2>
        <ul className="poll-choices">
          {poll_choices}
        </ul>
        <div className="buttons">
          <a href="#" className="button">Submit Answer</a>
        </div>
      </form>
    )
  }
});

