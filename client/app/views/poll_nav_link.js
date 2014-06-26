/** @jsx React.DOM */

var React = require('react');
var Link = require('react-nested-router').Link;

module.exports = React.createClass({
  propTypes: {
    question: React.PropTypes.string,
    id: React.PropTypes.string
  },

  render: function() {
    return (
      <li className="taken">
        <Link to="poll" id="{this.props.id}">
          {this.props.question}
        </Link>
      </li>
    )
  }
});

