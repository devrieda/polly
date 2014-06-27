/** @jsx React.DOM */

var React = require('react');
var Link = require('react-nested-router').Link;
var UserProfile = require('./user_profile');
var DrawerNavLink = require('./drawer_nav_link');

var PollSession = require('../models/poll_session');

module.exports = React.createClass({
  getInitialState: function() {
    return {openedSessions: [], closedSessions: []};
  },

  componentDidMount: function() {
    PollSession.opened(this, function(sessions) {
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

