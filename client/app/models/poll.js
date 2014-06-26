var $ = require('jquery');
var env = require('../../config/env');
var ModelCacher = require('./model_cacher');

var Poll;

var cache = new ModelCacher(5);

var transformData = function(data) {
  var poll = new Poll();
  poll.question = data.question;
  poll.description = data.description;
  poll.id = data.id;

  return poll;
}

var transformCollection = function(data) {
  var items = data.map(function(item) {
    return transformData(item);
  });

  return items;
}

Poll = function() {
  this.id = '';
  this.question = '';
  this.description = '';
}

Poll.all = function(context, callback) {
  var url = env.API_HOST + "/" + env.API_NAMESPACE + "/polls";

  if(cache.isValidFor(url)) {
    callback.call(context, transformCollection(cache.cacheFor(url)));
  } else {
    $.ajax({
      dataType: 'json',
      url: url,
      success: function(data) {
        cache.cacheResults(url, data.polls);
        callback.call(context, transformCollection(data.polls));
      }.bind(this),
      error: function(xhr, status, err) {
        console.log("Problem requesting: " + url);
      }
    });
  }
}

Poll.find = function(pollId, context, callback) {
  var url = env.API_HOST + "/" + env.API_NAMESPACE + "/polls" + "/" + pollId;

  if(cache.isValidFor(url)) {
    callback.call(context, transformData(cache.cacheFor(url)));
  } else {
    $.ajax({
      dataType: 'json',
      url: url,

      success: function(data) {
        cache.cacheResults(url, data['polls'][0]);
        callback.call(context, transformData(data['polls'][0]));
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }
    });
  }
}

Poll.flushCache = function() {
  cache.flushCache();
}

module.exports = Poll;
