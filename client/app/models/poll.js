var $ = require('jquery');
var env = require('../../config/env');

var ModelCacher = require('../modules/model_cacher');
var ModelTransformer = require('../modules/model_transformer');

var cache = new ModelCacher(5);

var Poll = function() {
  this.id = '';
  this.question = '';
  this.description = '';
}

var transformer = new ModelTransformer(Poll, { question: 'question', 
                                               description: 'description', 
                                               id: 'id' });

Poll.all = function(context, callback) {
  var url = env.API_HOST + "/" + env.API_NAMESPACE + "/polls";

  if(cache.isValidFor(url)) {
    callback.call(context, transformer.transformCollection(cache.cacheFor(url)));
  } else {
    $.ajax({
      dataType: 'json',
      contentType: 'application/json',
      url: url,
      success: function(data) {
        cache.cacheResults(url, data.polls);
        callback.call(context, transformer.transformCollection(data.polls));
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
    callback.call(context, transformer.transform(cache.cacheFor(url)));
  } else {
    $.ajax({
      dataType: 'json',
      contentType: 'application/json',
      url: url,

      success: function(data) {
        cache.cacheResults(url, data['polls'][0]);
        callback.call(context, transformer.transform(data['polls'][0]));
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
