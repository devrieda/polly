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
  var transformer = this;

  $.each(transformer.mapping, function(json_key, object_key) {
    transformer.model[object_key] = data[json_key];
  });
  return transformer.model;
}

ModelTransformer.prototype.transformCollection = function(data) {
  var transformer = this;

  return data.map(function(item) {
    return transformer.transform(item);
  });
}

module.exports = ModelTransformer;
