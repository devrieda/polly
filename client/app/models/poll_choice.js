var $ = require('jquery');
var env = require('../../config/env');

var ModelCacher = require('../modules/model_cacher');
var ModelTransformer = require('../modules/model_transformer');

var cache = new ModelCacher(5);

var PollChoice = function() {
  this.id = '';
  this.position = '';
  this.text = '';
  this.isCorrect = '';
}
var transformer = new ModelTransformer(PollChoice, { id: 'id',
                                                     position: 'position',
                                                     is_correct: 'isCorrect',
                                                     text: 'text' });

PollChoice.all = function(pollId, context, callback) {
  var url = env.API_HOST + "/" + env.API_NAMESPACE + "/polls/" + pollId + "/poll_choices";
  if(cache.isValidFor(url)) {
    callback.call(context, transformer.transformCollection(cache.cacheFor(url)));
  } else {
    $.ajax({
      dataType: 'json',
      contentType: 'application/json',
      url: url,
      success: function(data) {
        cache.cacheResults(url, data['poll_choices']);
        callback.call(context, transformer.transformCollection(data['poll_choices']));
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(env.API_HOST, status, err.toString());
      }
    });
  }
}

PollChoice.find = function(pollId, pollChoiceId, context, callback) {
  var url = env.API_HOST + "/" + env.API_NAMESPACE + "/polls/" + pollId + "/poll_choices/" + pollChoiceId;
  if(cache.isValidFor(url)) {
    callback.call(context, transformer.transformData(cache.cacheFor(url)));
  } else {
    $.ajax({
      dataType: 'json',
      contentType: 'application/json',
      url: url,
      success: function(data) {
        cache.cacheResults(url, data['poll_choices'][0]);
        callback(call, transformer.transformData(data['poll_choices'][0]));
      },
      error: function(xhr, status, err) {
        console.error(env.API_HOST, status, err.toString());
      }
    });
  }
}

module.exports = PollChoice;
