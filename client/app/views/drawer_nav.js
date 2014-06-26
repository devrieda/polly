/** @jsx React.DOM */

var React = require('react');
var Link = require('react-nested-router').Link;

module.exports = React.createClass({
  render: function() {
    return (
      <nav className="drawer-nav">
        <div className="profile">
          <img src="http://gravatar.com/avatar/99dc99eca024ae6da393c6d64a27ff3e?s=50" />
          <p>Derek DeVries</p>
        </div>

        <h3>Open Polls</h3>
        <ul className="nav-polls open">
          <li className="taken">
            <Link to="poll" id="1">
              Who is your favorite Arrested Development character?
            </Link>
          </li>
          <li className="taken">
            <Link to="poll" id="2">
              What is your favorite color?
            </Link>
          </li>
          <li className="">
            <Link to="poll" id="3">
              What soccer team is going to win the World Cup?
            </Link>
          </li>
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

