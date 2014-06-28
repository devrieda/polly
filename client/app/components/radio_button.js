/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

  handleClick: function() {
    if (this.props.onSelect && !this.props.disabled) {
      this.props.onSelect(this.props.value);
    }
  },

  render: function() {
    var indicatorClass = 'radio-button';
    indicatorClass += (this.props.selected)? ' selected' : '';
    indicatorClass += (this.props.disabled)? ' disabled' : '';
    indicatorClass += (this.props.className)? (' ' + this.props.className) : '';
    return (
      <div className={indicatorClass} onClick={this.handleClick}>
        <div className='radio-label'>
          {this.props.label}
        </div>
      </div>
    )
  }

});
