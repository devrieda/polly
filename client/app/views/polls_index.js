/** @jsx React.DOM */

var $ = require('jquery');
var env = require('../../config/env');

var React = require('react');
var Router = require('react-nested-router').Router

var Poll = require('../models/poll');

var DrawerLayout = require('./drawer_layout')


module.exports = React.createClass({

  getInitialState: function() {
    return { data: {polls: []} }
  },

  componentWillMount: function() {
    // load polls
    $.ajax({
      dataType: 'json',
      url: env.API_HOST + "/" + env.API_NAMESPACE + "/polls",

      success: function(data) {
        this.setState({data: data['polls']});
      }.bind(this),

     error: function(xhr, status, err) {
       console.error(env.API_HOST, status, err.toString());
     }.bind(this)
    });
  },

  render: function() {
    var polls = [];
    for (var i=0; i <= this.state.data.length; i++) {
      var poll = this.state.data[i];
      if (poll !== undefined) {
        var question = poll.question;
        polls.push(<Poll question={question} />);
      }
    }

    return (
      <DrawerLayout />
    )
  }
});
