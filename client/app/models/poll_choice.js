var $ = require('jquery');
var env = require('../../config/env');

module.exports =  {

  all: function(pollId) {
    var pollChoices = [];

    $.ajax({
      dataType: 'json',
      url: env.API_HOST + "/" + env.API_NAMESPACE + "/polls/" + pollId + "/poll_choices",

      success: function(data) {
        pollChoices = data['pollChoices'];
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(env.API_HOST, status, err.toString());
      }.bind(this)
    });

    return pollChoices;
  },

  find: function(pollId, pollChoiceId) {
    var pollChoice;

    $.ajax({
      dataType: 'json',
      url: env.API_HOST + "/" + env.API_NAMESPACE + "/polls/" + pollId + "/poll_choices/" + pollChoiceId,

      success: function(data) {
        pollChoice = data['poll_choices'][0];
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(env.API_HOST, status, err.toString());
      }.bind(this)
    });

    return pollChoice;
  }
}
