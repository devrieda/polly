var $ = require('jquery');
var env = require('../../config/env');
var ModelCacher = require('./model_cacher');

var User;

var cache = new ModelCacher(5);

var transformData = function(data) {
  var user = new User();
  user.avatarUrl = env.user_image;
  user.displayName = data.sortable_name;
  return user;
}

/*
 *  public interface
 */

User = function() {
  this.avatarUrl = '';
  this.displayName = '';
}

User.find = function(id, context, callback) {
  var url = '/api/v1/users/' + id + '/profile';
  if (cache.isValidFor(url)) {
    callback.call(context, transformData(cache.cacheFor(url)));
  } else {
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        cache.cacheResults(url, data);
        callback.call(context, transformData(data));
      }.bind(this),
      error: function() {
        console.log('error loading profile data for id: ' + id);
      }
    });
  }
}

User.flushCache = function() {
  cache.flushCache();
}

module.exports = User;
