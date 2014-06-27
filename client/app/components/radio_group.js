/** @jsx React.DOM */

var React = require('react');
var RadioButton = require('./radio_button');

module.exports = React.createClass({

  getInitialState: function(){
    return {
      selectedValue: ''
    }
  },

  handleItemSelect: function(value) {
    this.setState({selectedValue: value});
    this.props.onChange(value);
  },

  decorateChildren: function() {
    React.Children.forEach(this.props.children, function(child) {
      var isSelected = (this.state.selectedValue === child.props.value);
      child.props.onSelect = this.handleItemSelect;
      if (isSelected !== child.props.selected) {
        child.props.selected = isSelected;
        if (child.isMounted())
          child.forceUpdate();
      }
    }.bind(this));
  },

  render: function() {
    this.decorateChildren();
    return (
      <div className='radio-group'>
        {this.props.children}
      </div>
    )
  }

});

