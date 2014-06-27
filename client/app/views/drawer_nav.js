/** @jsx React.DOM */

var React = require('react');
var Router = require('react-nested-router').Router;
var Link = require('react-nested-router').Link;

var PollSession = require('../models/poll_session');

var UserProfile = require('./user_profile');
var DrawerNavLink = require('./drawer_nav_link');

module.exports = React.createClass({
  getInitialState: function() {
    return {openedSessions: [], closedSessions: []};
  },

  componentDidMount: function() {
    PollSession.opened(this, function(sessions) {
      if (!this.props.pollId && sessions.length > 0) {
        return Router.replaceWith('session', {
          pollId: sessions[0].pollId, 
          sessionId: sessions[0].id
        });
      }
      this.setState({openedSessions: sessions});
    });

    PollSession.closed(this, function(sessions) {
      this.setState({closedSessions: sessions});
    });
  },

  render: function() {
    var openPolls = this.state.openedSessions.map(function(session) {
      return <DrawerNavLink key={session.id} session={session} pollId={session.pollId} />
    });

    var closedPolls = this.state.closedSessions.map(function(session) {
      return <DrawerNavLink key={session.id} session={session} pollId={session.pollId} />
    });

    return (
      <nav className="drawer-nav">
        <UserProfile />

        <h3>Open Polls</h3>
        <ul className="nav-polls open">
          {openPolls}
        </ul>

        <h3>Closed Polls</h3>
        <ul className="nav-polls closed">
          {closedPolls}
        </ul>
      </nav>
    )
  }
});

