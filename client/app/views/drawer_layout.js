/** @jsx React.DOM */

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
  },
  loadPolls: function(data) {
    if (!this.props.params.id && data.length > 0) {
      Router.replaceWith('poll', {id: data[0].id});
    }
    this.setState({polls: data, loaded: true});

    // close the drawer after loading new things
    if (this.state.drawer == 'open') {
      setTimeout(this.closeDrawer.bind(this), 200);
    }
  },
  closeDrawer: function() {
    localStorage['drawer'] = 'closed';
    this.setState({'drawer': localStorage['drawer']});
  },

  render: function() {
    var submissionForm;
    if (this.state.loaded && this.state.polls.length == 0) {
      submissionForm = <NoPolls />
    } else {
      submissionForm = <PollSubmissionForm pollId={this.props.params.id}
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

            <div className="body">
              {submissionForm}
            </div>
          </div>
        </div>

        <DrawerNav polls={this.state.polls} />
      </div>
    )
  }
});

