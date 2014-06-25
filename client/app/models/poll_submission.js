/** @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;

module.exports = React.createClass({
  propTypes: {
    id: ReactPropTypes.number,
    poll_session_id: ReactPropTypes.number,
    poll_choice_id: ReactPropTypes.number,
    user_id: ReactPropTypes.number,
    created_at: ReactPropTypes.string
  }
});
