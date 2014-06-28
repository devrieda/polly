var $ = require('jquery');
var env = require('../../config/env');

var ModelCacher = require('../modules/model_cacher');
var ModelTransformer = require('../modules/model_transformer');

var cache = new ModelCacher(5);

var PollSubmission = function() {
  this.id = '';
  this.pollId = '';
  this.pollChoiceId = '';
  this.pollSessionId = '';
  this.userId = '';
  this.createdAt = '';
}

var transformer = new ModelTransformer(PollSubmission, { 
  id: 'id',
  poll_choice_id: 'pollChoiceId',
  poll_session_id: 'pollSessionId',
  user_id: 'userId',
  created_at: 'createdAt'
});

PollSubmission.find = function(pollId, pollSessionId, pollSubmissionId, context, callback) {
  var url = env.API_HOST + "/" + env.API_NAMESPACE +
                           "/polls/" + pollId +
                           "/poll_sessions/" + pollSessionId +
                           "/poll_submissions/" + pollSubmissionId;

  if (cache.isValidFor(url)) {
    callback.call(context, transformer.transform(cache.cacheFor(url)));
  } else {
    $.ajax({
      dataType: 'json',
      contentType: 'application/json',
      url: url,
      success: function(data) {
        cache.cacheResults(url, data['poll_sessions'][0]);
        callback.call(context, transformer.transform(data['poll_sessions'][0]));
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }
    });
  }
}

PollSubmission.prototype.save = function(context, callback) {
  var url = env.API_HOST + "/" + env.API_NAMESPACE +
                           "/polls/" + this.pollId +
                           "/poll_sessions/" + this.pollSessionId +
                           "/poll_submissions/";
  var payload = {
    'poll_submissions': [{'poll_choice_id': this.pollChoiceId}]
  }

  $.ajax({
    dataType: 'json',
    contentType: 'application/json',
    type: 'POST',
    url: url,
    data: JSON.stringify(payload),


    success: function(data) {
      callback.call(context, data);
    },

    error: function(xhr, status, err) {
      console.error(url, status, err.toString());
    }
  });

}

module.exports = PollSubmission;
