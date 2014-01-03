var DSL = require("./dsl");

var Controller = function(block) {
	// initialization
	this.actions = {};

	// store the value of this for use in different contexts
	var controller = this;

	var dsl = new DSL(function() {
		// TODO: define controller DSL here.
	});

	this.actions = dsl.call(block);
};

// public class methods

Controller.find = function(name) {
	return require(Fluid.application.expandPath("app/controllers/" + name + "_controller"));
};

// public instance methods

Controller.prototype.call = function(action, data) {
	var dsl = new DSL(data);
	return dsl.call(this.actions[action]);
};

module.exports = Controller;
