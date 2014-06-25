/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

  render: function() {
    return (
      <form className="poll-submission-form">
        <h2>Who is your favorite Arrested Development character?</h2>
        <ul>
          <li className="poll-choice">
            <label for="">
              <input type="checkbox" id="choice_1" />
              Tobias Fünke
            </label>
          </li>
          <li className="poll-choice">
            <label for="">
              <input type="checkbox" id="choice_2" />
              GOB Bluth
            </label>
          </li>
          <li className="poll-choice">
            <label for="">
              <input type="checkbox" id="choice_3" />
              George Michael Bluth
            </label>
          </li>
          <li className="poll-choice">
            <label for="">
              <input type="checkbox" id="choice_4" />
              Steve Holt
            </label>
          </li>
        </ul>
        <a href="#" className="button">Submit Answer</a>
      </form>
    )
  }
});

