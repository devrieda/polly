var $ = require('jquery');
var env = require('../../config/env');

module.exports = {
  all: function(handler) {

    $.ajax({
      dataType: 'json',
      url: env.API_HOST + "/" + env.API_NAMESPACE + "/polls",

      success: function(data) {
        handler(data.polls);
      },

      error: function(xhr, status, err) {
        console.error(env.API_HOST, status, err.toString());
      }
    });
  },

  find: function(pollId, handler) {
    $.ajax({
      dataType: 'json',
      url: env.API_HOST + "/" + env.API_NAMESPACE + "/polls/" + pollId,

      success: function(data) {
        handler(data['polls'][0]);
      },

      error: function(xhr, status, err) {
        console.error(env.API_HOST, status, err.toString());
      }
    });
  }
}
