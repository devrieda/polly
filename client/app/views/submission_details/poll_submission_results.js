/** @jsx React.DOM */

var React = require('react');
var AllResults = require('./all_results');
var UserChoice = require('./user_choice');

module.exports = React.createClass({

  render: function() {
    var hasPublicResults = this.props.submission.hasPublicResults;
    return (hasPublicResults)? <AllResults /> : <UserChoice />;
  }
});
