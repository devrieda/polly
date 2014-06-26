var $ = require('jquery');
var env = require('../../config/env');

module.exports = {
  all: function() {
    var polls = [];

    $.ajax({
      dataType: 'json',
      url: env.API_HOST + "/" + env.API_NAMESPACE + "/polls",

      success: function(data) {
        polls = data['polls'];
      }.bind(this),

     error: function(xhr, status, err) {
       console.error(env.API_HOST, status, err.toString());
     }.bind(this)
    });

    return polls;
  },

  find: function(poll_id) {
    var poll;

    $.ajax({
      dataType: 'json',
      url: env.API_HOST + "/" + env.API_NAMESPACE + "/polls/" + poll_id,

      success: function(data) {
        poll = data['polls'][0];
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(env.API_HOST, status, err.toString());
      }.bind(this)
    });

    return poll;
  }
}
