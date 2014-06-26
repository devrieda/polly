var $ = require('jquery');
var env = require('../../config/env');

module.exports =  {

  all: function(pollId, handler) {
    $.ajax({
      dataType: 'json',
      url: env.API_HOST + "/" + env.API_NAMESPACE + "/polls/" + pollId + "/poll_choices",

      success: function(data) {
        handler(data['pollChoices']);
      },

      error: function(xhr, status, err) {
        console.error(env.API_HOST, status, err.toString());
      }
    });

  },

  find: function(pollId, pollChoiceId, handler) {
    $.ajax({
      dataType: 'json',
      url: env.API_HOST + "/" + env.API_NAMESPACE + "/polls/" + pollId + "/poll_choices/" + pollChoiceId,

      success: function(data) {
        handler(data['poll_choices'][0]);
      },

      error: function(xhr, status, err) {
        console.error(env.API_HOST, status, err.toString());
      }
    });
  }
}
