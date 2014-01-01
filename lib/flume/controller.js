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

Controller.prototype.call = function(action) {
	return new this.actions[action];
};

module.exports = Controller;
