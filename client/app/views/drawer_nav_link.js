/** @jsx React.DOM */

var React = require('react');
var Link = require('react-nested-router').Link;

var Poll = require('../models/poll');

module.exports = React.createClass({
  getInitialState: function() {
    return { poll: {id: -1} }
  },

  componentDidMount: function() {
    Poll.find(this.props.pollId, this, function(poll) {
      this.setState({poll: poll});
    });
  },

  render: function() {
    var is_available = !this.props.session.hasSubmitted ? 'available' : ''
    var is_shared = this.props.session.hasPublicResults ? 'shared' : ''

    var classes = [is_available, is_shared].join(' ');
    return (
      <li className={classes}>
        <Link to="poll" pollId={this.props.pollId}>
          <span className="question">
            {this.state.poll.question}
          </span>
          <span className="date">
            {this.props.session.createdAt}
          </span>
        </Link>
      </li>
    )
  }
});

