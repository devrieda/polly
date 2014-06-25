/** @jsx React.DOM */

var React = require('react');

var PollSubmissionForm = require('./poll_submission_form')
var DrawerNav = require('./drawer_nav')

module.exports = React.createClass({
  render: function() {
    return (
      <div className="drawer-layout">
        <div className="drawer-content">
          <div className="wrap">
            <header className="title-bar">
              <div className="menu">
                <a href="#">Menu</a>
              </div>
              <h1>Polling</h1>
            </header>

            <div className="body">
              <PollSubmissionForm />
            </div>
          </div>
        </div>

        <DrawerNav />
      </div>
    )
  }
});

