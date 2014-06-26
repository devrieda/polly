/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className='no-polls'>
        No polls available. Tell your teacher or TA to create one!
      </div>
    )
  }
});
