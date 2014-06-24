/** @jsx React.DOM */

var React = require('react');
var Link = require('react-nested-router').Link;

module.exports = React.createClass({

  render: function() {
    return (
      <div>
        <h1>Polly: Canvas Polling</h1>
        <img src='/assets/polly.png' />
        <ul>
          <li><a href='https://itunes.apple.com/us/store'>Download iOS App</a></li>
          <li><a href='https://play.google.com/store'>Download Android App</a></li>
          <li><Link to='pollsIndex'>Launch</Link></li>
        </ul>
      </div>
    )
  }
});
