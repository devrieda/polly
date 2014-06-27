/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  render: function() {
    var disabled = this.props.disabled ? 'disabled' : '';

    return (
      <input type="submit" value="Submit Answer" className={"button " + disabled} />
    )
  }
});

