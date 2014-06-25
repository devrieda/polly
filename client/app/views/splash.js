/** @jsx React.DOM */

var React = require('react');
var Link = require('react-nested-router').Link;

module.exports = React.createClass({

  render: function() {
    return (
      <div className="splash">
        <h1>Polly: Canvas Polls</h1>
        <img src='/assets/common/polly.png' className="parrot" />
        <p>
          Canvas Polls allows you to instantly assess student comprehension
          with live, in-class polling. Canvas Polls is free, easy-to-use, and
          leverages students’ own smartphones or tablets, making it more 
          accessible than off-the-shelf devices. 
        </p>

        <div className="buttons">
          <Link className="launch button" to='pollsIndex'>Launch</Link>
        </div>

        <ul>
          <li>
            <a href='https://itunes.apple.com/us/store'>
              <img src="/assets/badges/app-store.png" />
            </a>
          </li>
          <li>
            <a href='https://play.google.com/store'>
              <img src="/assets/badges/google-play.png" />
            </a>
          </li>
        </ul>
      </div>
    )
  }
});
