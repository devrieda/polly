/** @jsx React.DOM */

var debounce = require('debounce');
var React = require('react');
var Router = require('react-nested-router').Router;

var Poll = require('../models/poll');

var DrawerNav = require('./drawer_nav');
var SubmissionDetails = require('./submission_details');

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
    window.addEventListener("resize", debounce(this.closeDrawer, 250));
  },
  loadPolls: function(data) {
    this.closeDrawer();
  },
  closeDrawer: function() {
    if (this.state.drawer == 'closed') { return; }

    setTimeout(function() {
      localStorage['drawer'] = 'closed';
      this.setState({'drawer': localStorage['drawer']});
    }.bind(this), 200);
  },

  onSessionsLoaded: function() {
    this.setState({loaded: true});
  },

  componentWillUnmount: function() {
    window.removeEventListener("resize", this.closeDrawer);
  },

  render: function() {
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
              <SubmissionDetails params={this.props.params} loaded={this.state.loaded} />
            </div>
          </div>
        </div>

        <DrawerNav pollId={this.props.params.pollId}
                   onSessionsLoaded={this.onSessionsLoaded}/>
      </div>
    )
  }
});

