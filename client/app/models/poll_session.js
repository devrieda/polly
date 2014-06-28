var $ = require('jquery');
var moment = require('moment');
var env = require('../../config/env');

var ModelCacher = require('../modules/model_cacher');
var ModelTransformer = require('../modules/model_transformer');

var Poll = require('./poll');
var PollSubmission = require('./poll_submission');

var cache = new ModelCacher(5);

var PollSession = function() {
  this.id = '';
  this.courseId = '';
  this.courseSectionId = '';
  this.pollId = '';
  this.isPublished = '';
  this.createdAt = '';
  this.hasSubmitted = '';
  this.poll = '';
}

var sortByDate = function(sessions) {
  sessions.sort(function(a, b) {
    return moment(b.createdAt).isAfter(a.createdAt);
  });
  return sessions;
}

var transformer = new ModelTransformer(PollSession, {
  id: 'id',
  course_id: 'courseId',
  course_section_id: 'courseSectionId',
  poll_id: 'pollId',
  is_published: 'isPublished',
  created_at: 'createdAt',
  has_submitted: 'hasSubmitted',
  has_public_results: 'hasPublicResults',
  poll_submissions: 'pollSubmissions', 
  poll_submission: 'pollSubmission'
});
var subTransformer = new ModelTransformer(PollSubmission, {
  id: 'id',
  poll_choice_id: 'pollChoiceId',
  poll_session_id: 'pollSessionId',
  user_id: 'userId',
  created_at: 'createdAt'
});

PollSession.opened = function(context, callback) {
  var url = env.API_HOST + "/" + env.API_NAMESPACE + "/poll_sessions/opened";
  if(cache.isValidFor(url)) {
    callback.call(context, sortByDate(transformer.transformCollection(cache.cacheFor(url))));
  } else {
    $.ajax({
      dataType: 'json',
      contentType: 'application/json',
      url: url,
      success: function(data) {
        cache.cacheResults(url, data['poll_sessions']);
        callback.call(context, sortByDate(transformer.transformCollection(data['poll_sessions'])));
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }
    });
  }
}

PollSession.closed = function(context, callback) {
  var url = env.API_HOST + "/" + env.API_NAMESPACE + "/poll_sessions/closed";
  if(cache.isValidFor(url)) {
    callback.call(context, sortByDate(transformer.transformCollection(cache.cacheFor(url))));
  } else {
    $.ajax({
      dataType: 'json',
      contentType: 'application/json',
      url: url,
      success: function(data) {
        cache.cacheResults(url, data['poll_sessions']);
        callback.call(context, sortByDate(transformer.transformCollection(data['poll_sessions'])));
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }
    });
  }
}

PollSession.find = function(pollSessionId, pollId, context, callback) {
  var url = env.API_HOST + "/" + env.API_NAMESPACE + "/polls/" + pollId + "/poll_sessions/" + pollSessionId;
  if(cache.isValidFor(url)) {
    callback.call(context, transformer.transform(cache.cacheFor(url)));
  } else {
    $.ajax({
      dataType: 'json',
      contentType: 'application/json',
      url: url,
      success: function(data) {
        var session = data['poll_sessions'][0];
        var submission = session['poll_submissions'][0];
        if (submission) {
          session['poll_submission'] = subTransformer.transform(submission)
        }
        cache.cacheResults(url, session);
        callback.call(context, transformer.transform(session));
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }
    });
  }
}

module.exports = PollSession;
