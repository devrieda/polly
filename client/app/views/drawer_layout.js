/** @jsx React.DOM */

var debounce = require('debounce');
var React = require('react');
var Router = require('react-nested-router').Router;

var Poll = require('../models/poll');

var PollSubmissionForm = require('./poll_submission_form');
var NoPolls = require('./no_polls');
var DrawerNav = require('./drawer_nav');

module.exports = React.createClass({
  getInitialState: function() {
    return {drawer: (localStorage['drawer'] || "closed"), polls: [], loaded: false};
  },

  handleMenuClick: function() {
    localStorage['drawer'] = localStorage['drawer'] == 'open' ? 'closed' : 'open';
    this.setState({'drawer': localStorage['drawer']});
    return false;
  },

  componentDidMount: function() {
    Poll.all(this, this.loadPolls);
    window.addEventListener("resize", debounce(this.closeDrawer, 250));
  },
  loadPolls: function(data) {
    if (!this.props.params.pollId && data.length > 0) {
      Router.replaceWith('poll', {pollId: data[0].id});
    }
    this.setState({polls: data, loaded: true});
    this.closeDrawer();
  },
  closeDrawer: function() {
    if (this.state.drawer == 'closed') { return; }

    setTimeout(function() {
      localStorage['drawer'] = 'closed';
      this.setState({'drawer': localStorage['drawer']});
    }.bind(this), 200);
  },

  componentWillUnmount: function() {
    window.removeEventListener("resize", this.closeDrawer);
  },

  render: function() {
    var submissionForm;
    if (this.state.loaded && this.state.polls.length == 0) {
      submissionForm = <NoPolls />
    } else {
      submissionForm = <PollSubmissionForm pollId={this.props.params.pollId}
                                           loaded={this.state.loaded} />
    }

    return (
      <div className="drawer-layout">
        <div className={'drawer-content ' + this.state.drawer}>
          <div className="wrap">
            <header className="title-bar">
              <div className="menu">
                <a href="#" onClick={this.handleMenuClick}>
                  <span className="screenreader-only">Menu</span>&nbsp;
                </a>
              </div>
              <h1>Polling</h1>
            </header>

            <div className="content">
              {submissionForm}
            </div>
          </div>
        </div>

        <DrawerNav />
      </div>
    )
  }
});

