/** @jsx React.DOM */

var React = require('react');
var env = require('../../config/env');
var User = require('../models/user');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      avatarUrl: '',
      displayName: ''
    }
  },

  componentWillMount: function() {
    User.find(env.canvasUserId, this, function(user) {
      this.setState(user);
    });
  },

  render: function() {
    return (
      <div className="profile">
        <img src={this.state.avatarUrl} />
        <p>{this.state.displayName}</p>
      </div>
    )
  }

});
