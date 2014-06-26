/** @jsx React.DOM */

var React = require('react');

var Poll = require('../models/poll');

var PollNavLink = require('./poll_nav_link');
var PollSubmissionForm = require('./poll_submission_form')
var DrawerNav = require('./drawer_nav')

module.exports = React.createClass({
  getInitialState: function() {
    return {'open': false, 'polls': []}
  },

  handleMenuClick: function() {
    this.setState({'open': !this.state.open});
    return false;
  },

  componentWillMount: function() {
    Poll.all(function(data) {
      this.setState({polls: data});
    }.bind(this));
  },

  render: function() {
    var polls = [];
    var submissionForm;

    for (var i=0; i <= this.state.polls.length; i++) {
      var poll = this.state.polls[i];
      if (poll !== undefined) {
        if (i == 0) {
          submissionForm = <PollSubmissionForm pollId={poll.id} pollQuestion={poll.question} />;
        }
        polls.push(<PollNavLink question={poll.question} id={poll.id} />);
      }
    }

    return (
      <div className="drawer-layout">
        <div className={'drawer-content' + (this.state.open ? ' open' : '')}>
          <div className="wrap">
            <header className="title-bar">
              <div className="menu">
                <a href="#" onClick={this.handleMenuClick}>Menu</a>
              </div>
              <h1>Polling</h1>
            </header>

            <div className="body">
              {submissionForm}
            </div>
          </div>
        </div>

        <DrawerNav polls={polls} />
      </div>
    )
  }
});

