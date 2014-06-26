var $ = require('jquery');
var ModelTransformer;

/*
 * model: the instantiated model you want to transform to, e.g. new Poll() 
 *
 * mapping: the conversion from json (the key) to the object attribute (the value) e.g.:
 * { poll_id: 'pollId', poll_question: 'pollQuestion' }
 *
 */
ModelTransformer = function(model, mapping) {
  this.model = model;
  this.mapping = mapping;
}

ModelTransformer.prototype.transform = function(data) {
  $.each(this.mapping, function(json_key, object_key) {
    this.model[object_key] = data[json_key];
  }.bind(this));
  return this.model;
}

ModelTransformer.prototype.transformCollection = function(data) {
  return data.map(function(item) {
    return this.transform(item);
  }.bind(this));
}

module.exports = ModelTransformer;
