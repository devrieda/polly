/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
  render: function() {
    var bars = [];
    var barStyle;

    for (var i = 0; i < 12; i++) {
      barStyle = {};
      barStyle.WebkitAnimationDelay = (i - 12) / 10 + 's';
      barStyle.animationDelay = (i - 12) / 10 + 's';
      barStyle.WebkitTransform = barStyle.transform =
        'rotate(' + (i * 30) + 'deg) translate(9.5px)';
      bars.push(
        <div key={i} style={barStyle} className="spinner-bar" />
      );
    }

    return this.transferPropsTo(
      <div className="spinner">{bars}</div>
    )
  }
});
