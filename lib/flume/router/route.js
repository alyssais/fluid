var Route = function(hash) {
	this.method = hash.method;
	this.path = hash.path;
	this.controller = hash.controller;
	this.action = hash.action;
};

Route.prototype.toString = function() {
	return this.method.toUpperCase()
		+ " " + this.path
		+ " -> " + this.controller
		+ "#" + this.action;
};

module.exports = Route;
