/** @jsx React.DOM */

var React = require('react');
var Router = require('react-nested-router').Router
var env = require('../../config/env')

module.exports = React.createClass({

  isInFrame: function() {
    return window !== window.top;
  },

  createBorderlessUrl: function() {
    var parts = [];
    parts.push(env.launch_presentation_return_url);
    parts.push('/');
    parts.push('external_tools/retrieve?');
    parts.push('url=');
    parts.push(env.URI);
    parts.push('&borderless=1');
    return parts.join('');
  },

  componentDidMount: function() {
    if (!this.isInFrame()) {
      Router.transitionTo('polls');
    }
  },

  render: function() {
    var url = this.createBorderlessUrl();
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
          <a className='launch button' href={url} target='_top'>Launch</a>
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
