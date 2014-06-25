/** @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;

module.exports = React.createClass({
  propTypes: {
    id: ReactPropTypes.number,
    poll_id: ReactPropTypes.number,
    course_id: ReactPropTypes.number,
    course_section_id: ReactPropTypes.number,
    created_at: ReactPropTypes.string,
    is_published: ReactPropTypes.bool,
    has_public_results: ReactPropTypes.bool
  },

  getInitialState: function() {
    return {
      is_published: false,
      has_public_results: false
    }
  }
});
