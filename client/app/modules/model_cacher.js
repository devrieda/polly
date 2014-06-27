var ModelCacher;

/*
 * expireAfter: numMinutes afterWhich to consider cache invalid
 */

ModelCacher = function(expireAfter) {
  var minutes = expireAfter || 5;
  this.expireMS = minutes * 60000; // 60000 ms per minute
  this.cache = {};
}

ModelCacher.prototype.isValidFor = function(url) {
  var result = false;
  if (this.cache[url]) {
    var now = new Date().getTime();
    var expired = ((now - this.cache[url].date) > this.expireMS);
    if (expired) {
      this.cache[url] = null;
    } else {
      result = true;
    }
  }
  return result;
};

ModelCacher.prototype.cacheResults = function(url, data) {
  this.cache[url] = {
    date: new Date().getTime(),
    result: data
  };
};

ModelCacher.prototype.cacheFor = function(url) {
  if (!this.cache[url]) {
    throw new Error('attempting to pull cache for a non-cached endpoint: ' + url);
  }
  return this.cache[url].result;
};

ModelCacher.prototype.flushCache = function() {
  this.cache = {};
};



module.exports = ModelCacher;
