var $ = require('jquery');
var env = require('../../config/env');

var User;

var UserCache = {};

var transformData = function(data) {
  var user = new User();
  user.avatarUrl = env.user_image;
  user.displayName = data.sortable_name;
  return user;
}

var cacheResults = function(url, data) {
  UserCache[url] = {
    date: new Date(),
    result: data
  };
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
  if (UserCache[url]) {
    callback.call(context, transformData(UserCache[url].result));
  } else {
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        callback.call(context, transformData(data));
      }.bind(this),
      error: function() {
        console.log('error loading profile data for id: ' + id);
      }
    });
  }
}

module.exports = User
