/** @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;

module.exports = React.createClass({
  propTypes: {
    id: ReactPropTypes.number,
    text: ReactPropTypes.string,
    position: ReactPropTypes.number
  },

  getInitialState: function() {
    return {
      text: '',
      position: 0
    }
  },

  render: function() {
    return (
      <li>{this.props.text}</li>
    );
  }
});
