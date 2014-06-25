/** @jsx React.DOM */

var $ = require('jquery');
var env = require('../../config/env');

var React = require('react');
var Poll = require('../models/poll');

var DrawerLayout = require('./drawer_layout')
var PollSubmissionForm = require('./poll_submission_form')

module.exports = React.createClass({
  getInitialState: function() {
    return { polls: [] }
  },

  componentWillMount: function() {
    // load polls
    $.ajax({
      dataType: 'json',
      url: env.API_HOST + "/" + env.API_NAMESPACE + "/polls",

      success: function(data) {
        this.setState({polls: data['polls']});
      }.bind(this),

     error: function(xhr, status, err) {
       console.error(env.API_HOST, status, err.toString());
     }.bind(this)
    });

    // load poll
  },

  render: function() {
    var polls = [];
    var submission_form;

    for (var i=0; i <= this.state.polls.length; i++) {
      var poll = this.state.polls[i];
      if (poll !== undefined) {
        if (i == 0) {
          submission_form = <PollSubmissionForm poll_id={poll.id} poll_question={poll.question} />;
        }
        polls.push(<Poll id={poll.id} question={poll.question} description={poll.description} />);
      }
    }

    return (
      <DrawerLayout />
      <div className="navslider">
        <div className="page">
          <div className="wrap">
            <header className="title-bar">
              <div className="menu">
                <a href="#">Menu</a>
              </div>
              <h1>Polling</h1>
            </header>

            <div className="body">
              {submission_form}
            </div>
          </div>
        </div>

        <nav className="sidenav">
          <ul>
          {polls}
          </ul>
        </nav>
      </div>
    )
  }
});
