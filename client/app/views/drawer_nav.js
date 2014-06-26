/** @jsx React.DOM */

var React = require('react');
var Link = require('react-nested-router').Link;
var UserProfile = require('../components/user_profile');

module.exports = React.createClass({
  render: function() {
    return (
      <nav className="drawer-nav">
        <UserProfile />

        <h3>Open Polls</h3>
        <ul className="nav-polls open">
          {this.props.polls}
        </ul>

        <h3>Closed Polls</h3>
        <ul className="nav-polls closed">
          <li className="shared">
            <Link to="poll" id="4">
              Which movie is the greatest of all-time?
            </Link>
          </li>
          <li className="">
            <Link to="poll" id="5">
              What are you going to get on the final
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
});

