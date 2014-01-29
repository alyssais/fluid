var DSL = require("./dsl");
var _ = require("lodash");

var Controller = function(block) {
  var callbacks = {};
  var actions = {}

  var controller = function(action, data) {
    var dsl = new DSL(data);

    callbacks.before(action).forEach(dsl);
    var result = dsl(this.actions[action]);
    callbacks.after(action).forEach(dsl);

    return result;
  };

  controller.callbacks = { before: [], after: [] };

  var dsl = new DSL(function() {

    // register helpers for creating before and after actions.
    ['before', 'after'].forEach(function(when) {
      this[when] = function() {
        var args = Array.prototype.slice.apply(arguments);

        controller.callbacks[when].push({
          callback: args.pop(),
          actions: _.flatten(args)
        });
      };
    });

  });

  controller.actions = dsl(block);

  ['before', 'after'].forEach(function(when) {
    callbacks[when] = function(action) {
      return controller.callbacks[when].filter(function(callback) {
        return !callback.actions.length
          || _.contains(callback.actions, action);
      }).map(function(callback) {
        return callback.callback;
      });
    };
  });

  return function() {
    return controller.apply(controller, arguments);
  };
};

Controller.find = function(name) {
	return require(Fluid.application.expandPath("app/controllers/" + name + "_controller"));
};

module.exports = Controller;
