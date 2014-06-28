/** @jsx React.DOM */

var React = require('react');
var Spinner = require('../components/spinner.js');

module.exports = React.createClass({
  submitValue: function() {
    var value = 'Submit Answer';

    if (this.props.loading) {
      value = 'Loading...';
    } else if (this.props.complete) {
      value = 'Complete';
    }
  },

  render: function() {
    // disable when loading or complete
    if (this.props.loading || this.props.complete) {
      this.props.disabled = true;
    }

    var className = this.props.disabled ? 'disabled ' : '';
    className += this.props.complete ? 'complete ' : ''; 
    className += this.props.loading  ? 'loading '  : ''; 

    var loading = this.props.loading ? <Spinner className="submit-spinner" /> : '';

    return (
      <div className={'buttons ' + (this.props.hidden ? 'hidden' : '')}>
        {loading}
        <input type="submit"
              value={this.submitValue()}
          className={"button " + className}
           disabled={this.props.disabled ? 'disabled ' : ''} />
      </div>
    )
  }
});

