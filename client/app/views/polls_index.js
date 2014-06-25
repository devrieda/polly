/** @jsx React.DOM */

var React = require('react')
var Router = require('react-nested-router').Router

var poll = require('../models/poll');

module.exports = React.createClass({

  componentWillMount: function() {
    // load polls
  },

  render: function() {
    return (
      <div className="navslider">
        <div className="page">
          <div className="wrap">
            <header className="titlebar">
              <div className="menu">
                <a href="#">Menu</a>
              </div>
              <h1>Polling</h1>
            </header>

            <div className="body">
              <h2>Polly React App!</h2>
              <div>Your polls listed here...soon</div>
            </div>
          </div>
        </div>

        <nav className="sidenav">
          <ul>
            <li>Poll 1</li>
          </ul>
        </nav>
      </div>
    )
  }
});
