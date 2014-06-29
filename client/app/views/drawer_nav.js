/** @jsx React.DOM */
var $ = require('jquery');
var React = require('react');
var Router = require('react-nested-router').Router;
var Link = require('react-nested-router').Link;

var PollSession = require('../models/poll_session');

var UserProfile = require('./user_profile');
var DrawerNavLink = require('./drawer_nav_link');
var eventBus = require('../modules/event_bus');
var env = require('../../config/env.js');

module.exports = React.createClass({
  getInitialState: function() {
    return {openedSessions: [], closedSessions: []};
  },

  componentDidMount: function() {
    eventBus.on('sessions:change', this, this.reloadSessions);
    this.loadOpenPollSessions();
  },

  componentWillUnmount: function() {
    eventBus.off('sessions:change', this, this.reloadSessions);
  },

  reloadSessions: function() {
    this.loadOpenPollSessions();
  },

  loadOpenPollSessions: function() {
    PollSession.opened(this, function(sessions) {
      if (!this.props.pollId && sessions[0]) {
        return this.redirectToSession(sessions[0])
      }

      this.setState({openedSessions: sessions});
      this.loadClosedPollSessions();
    });
  },
  loadClosedPollSessions: function() {
    PollSession.closed(this, function(sessions) {
      this.props.onSessionsLoaded();
      this.setState({closedSessions: sessions});
    });
  },
  redirectToSession: function(session) {
    Router.replaceWith('session', {pollId: session.pollId, sessionId: session.id});
  },

  render: function() {
    // easier than doing it in the sortByDate function, don't judge me
    // (makes a little more sense here as well)
    var submittedOpenSessions =  this.state.openedSessions.filter(function(session) {
      return session.hasSubmitted;
    });
    var nonSubmittedOpenSessions = $(this.state.openedSessions).not(submittedOpenSessions).get();

    submittedOpenSessions = submittedOpenSessions.map(function(session) {
      return <DrawerNavLink key={session.id} session={session} pollId={session.pollId} />
    });

    nonSubmittedOpenSessions = nonSubmittedOpenSessions.map(function(session) {
      return <DrawerNavLink key={session.id} session={session} pollId={session.pollId} />
    });

    var closedSessions = this.state.closedSessions.map(function(session) {
      return <DrawerNavLink key={session.id} session={session} pollId={session.pollId} />
    });

    return (
      <nav className="drawer-nav">
        <UserProfile />

        <h3>Open Polls</h3>
        <ul className="nav-polls open">
          {nonSubmittedOpenSessions}
          {submittedOpenSessions}
        </ul>

        <h3>Closed Polls</h3>
        <ul className="nav-polls closed">
          {closedSessions}
        </ul>
        <div className='nav-return-link'>
          <a href={env.launch_presentation_return_url}>Return to Canvas</a>
        </div>
      </nav>
    )
  }
});

