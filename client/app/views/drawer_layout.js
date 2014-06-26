/** @jsx React.DOM */

var React = require('react');

var PollSubmissionForm = require('./poll_submission_form')
var DrawerNav = require('./drawer_nav')

module.exports = React.createClass({
  getInitialState: function() {
    return {'open': false}
  },
  handleMenuClick: function() {
    this.setState({'open': !this.state.open});
    return false;
  },
  render: function() {
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
              <PollSubmissionForm />
            </div>
          </div>
        </div>

        <DrawerNav />
      </div>
    )
  }
});

