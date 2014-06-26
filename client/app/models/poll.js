var $ = require('jquery');
var env = require('../../config/env');

var Poll;

var transformData = function(data) {
  var poll = new Poll();
  poll.question = data.question;
  poll.description = data.description;
  poll.id = data.id;

  return poll;
}

Poll = function() {
  this.id = '';
  this.question = '';
  this.description = '';
}

Poll.all = function(callback) {
  var url = env.API_HOST + "/" + env.API_NAMESPACE + "/polls";

  $.ajax({
    dataType: 'json',
    url: url,

    success: function(data) {
      var polls = data.polls.map(function(poll) {
        return transformData(poll);
      });

      callback(polls);
    },

    error: function(xhr, status, err) {
      console.log("Problem requesting: " + url);
    }
  });
}

Poll.find = function(pollId, callback) {
  var url = env.API_HOST + "/" + env.API_NAMESPACE + "/polls" + "/" + pollId;

  $.ajax({
    dataType: 'json',
    url: url,

    success: function(data) {
      callback(transformData(data['polls'][0]));
    },

    error: function(xhr, status, err) {
      console.error(url, status, err.toString());
    }
  });
}

module.exports = Poll;
