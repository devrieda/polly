var $ = require('jquery');
var env = require('../../config/env');
var ModelCacher = require('./model_cacher');

var PollChoice;

var cache = new ModelCacher(5);

var transformData = function(data) {
  var poll_choice = new PollChoice();
  poll_choice.text = data.text; 
  poll_choice.position = data.position;
  poll_choice.id = data.id;

  return poll_choice;
}

var transformCollection = function(data) {
  var items = data.map(function(item) {
    return transformData(item);
  });

  return items;
}

PollChoice = function() {
  this.id = '';
  this.position = '';
  this.description = '';
}



PollChoice.all = function(pollId, context, callback) {
  var url = env.API_HOST + "/" + env.API_NAMESPACE + "/polls/" + pollId + "/poll_choices";
  if(cache.isValidFor(url)) {
    callback.call(context, transformCollection(cache.cacheFor(url)));
  } else {
    $.ajax({
      dataType: 'json',
      url: url,
      success: function(data) {
        cache.cacheResults(url, data['poll_choices']);
        callback.call(context, transformCollection(data['poll_choices']));
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
    callback.call(context, transformData(cache.cacheFor(url)));
  } else {
    $.ajax({
      dataType: 'json',
      url: url,
      success: function(data) {
        cache.cacheResults(url, data['poll_choices'][0]);
        callback(call, transformData(data['poll_choices'][0]));
      },
      error: function(xhr, status, err) {
        console.error(env.API_HOST, status, err.toString());
      }
    });
  }
}

module.exports = PollChoice;
