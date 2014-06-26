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

Poll.all = function(callback) {
  var url = env.API_HOST + "/" + env.API_NAMESPACE + "/polls";

  if(cache.isValidFor(url)) {
    callback(transformCollection(cache.cacheFor(url)));
  } else {
    $.ajax({
      dataType: 'json',
      url: url,
      success: function(data) {
        cache.cacheResults(url, data.polls);
        callback(transformCollection(data.polls));
      },
      error: function(xhr, status, err) {
        console.log("Problem requesting: " + url);
      }
    });
  }
}

Poll.find = function(pollId, callback) {
  var url = env.API_HOST + "/" + env.API_NAMESPACE + "/polls" + "/" + pollId;

  if(cache.isValidFor(url)) {
    callback(transformData(cache.cacheFor(url)));
  } else {
    $.ajax({
      dataType: 'json',
      url: url,

      success: function(data) {
        cache.cacheResults(url, data['polls'][0]);
        callback(transformData(data['polls'][0]));
      },

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
