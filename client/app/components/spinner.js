/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({displayName: 'Spinner',
  render: function() {
    var bars = [];
    var barStyle;

    for (var i = 0; i < 12; i++) {
      barStyle = {};
      barStyle.WebkitAnimationDelay = barStyle.animationDelay = (i - 12) / 10 + 's';
      barStyle.WebkitTransform = barStyle.transform =
        'rotate(' + (i * 30) + 'deg) translate(9.5px)';
      bars.push(
        React.DOM.div({style:barStyle, className:"spinner_bar"})
      );
    }

    return this.transferPropsTo(
      React.DOM.div({className:"spinner"}, bars)
    )
  }
});
