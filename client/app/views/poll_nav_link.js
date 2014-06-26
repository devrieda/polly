/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  propTypes: {
    question: React.PropTypes.string
  },

  getInitialState: function() {
    question: ''
  },

  render: function() {
    return (
      <li>{this.props.question}</li>
    )
  }
});

