/** @jsx React.DOM */

var React = require('react');
var Link = require('react-nested-router').Link;
var UserProfile = require('./user_profile');
var DrawerNavLink = require('./drawer_nav_link');

module.exports = React.createClass({
  render: function() {
    var polls = this.props.polls.map(function (poll) {
      return <DrawerNavLink question={poll.question} id={poll.id} />;
    });

    return (
      <nav className="drawer-nav">
        <UserProfile />

        <h3>Open Polls</h3>
        <ul className="nav-polls open">
          <li className="available">
            <Link to="poll" pollId="1">
              <span className="question">
                Who is your favorite Arrested Development character?
              </span>
              <span className="date">
                Today
              </span>
            </Link>
          </li>
          <li className="">
            <Link to="poll" pollId="2">
              <span className="question">
                What is your favorite color?
              </span>
              <span className="date">
                6/11/2014
              </span>
            </Link>
          </li>
          <li className="">
            <Link to="poll" pollId="3">
              <span className="question">
                What soccer team is going to win the World Cup?
              </span>
              <span className="date">
                6/10/2014
              </span>
            </Link>
          </li>
        </ul>

        <h3>Closed Polls</h3>
        <ul className="nav-polls closed">
          <li className="shared">
            <Link to="poll" pollId="4">
              <span className="question">
                Which movie is the greatest of all-time?
              </span>
              <span className="date">
                5/8/2014
              </span>
            </Link>
          </li>
          <li className="">
            <Link to="poll" pollId="5">
              <span className="question">
                What are you going to get on the final
              </span>
              <span className="date">
                5/2/2014
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
});

