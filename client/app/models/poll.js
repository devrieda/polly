/** @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var Poll;

Poll = React.createClass({
  propTypes: {
    question: ReactPropTypes.string
  },

  getInitialState: function() {
    return {
      question: ''
    }
  },

  render: function() {
    return (
      <li>{this.props.question}</li>
    );
  }
});

module.exports = Poll;
