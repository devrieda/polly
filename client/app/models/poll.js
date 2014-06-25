/** @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var Poll;

Poll = React.createClass({
  propTypes: {
    id: ReactPropTypes.number,
    question: ReactPropTypes.string,
    description: ReactPropTypes.string,
    created_at: ReactPropTypes.string
  },

  getInitialState: function() {
    return {
      question: '',
      description: ''
    }
  },

  render: function() {
    return (
      <li>{this.props.question}</li>
    );
  }
});

module.exports = Poll;
