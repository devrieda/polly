/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  render: function() {
    var indicatorClass = 'radio-button readonly';
    indicatorClass +=  this.props.selected ? ' selected' : '';

    return (
      <li className="poll-choice">
        <div className={indicatorClass}>
          <div className='radio-label'>
            {this.props.choiceText}
          </div>
        </div>
      </li>
    )
  }
});

