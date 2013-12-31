var _ = require("lodash");
var DSL = require("./dsl");

var Controller = function(name, block) {
	// initialization
	this.actions = {};

	// store the value of this for use in different contexts
	var controller = this;

	var dsl = new DSL(function() {
		this.action = function(name, callback) {
			controller.actions[name] = callback;
		};

		// make a shorthand for the most commonly used method.
		this.$ = this.action;
	});

	dsl.call(block);
};

Controller.prototype.call = function(action) {
	return new this.actions[action];
};

module.exports = Controller;
