function EventBus (){
  this.events = {};
}

EventBus.prototype.on = function(event, context, callback) {
  this.events[event] = this.events[event] || [];
  this.events[event].push({cb: callback, context: context});
};

EventBus.prototype.off = function(event, context, callback) {
  if (this.events[event]) {
    var index = -1;
    for(var i = 0; i<this.events[event].length; i++) {
      var item = this.events[event][i];
      if (item.cb === callback && item.context === context) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      this.events[event].splice(index, 1);
    }
  }
};

EventBus.prototype.trigger = function(event) {
  if (this.events[event]) {
    this.events[event].forEach(function(item){
      item.cb.call(item.context);
    }.bind(this));
  }
};

module.exports = new EventBus();
