var _ = require("lodash");
var DSL = require("../dsl");
var Route = require("./route");

// TODO: move this into support.
Object.prototype.splat = function() {
	if (_.isArray(this)) return this;
	return [this];
};

// private class methods

var expressHandler = function(req, res) {
	console.log(this.method.toUpperCase() + " " + this.path);

	var controller = Fluid.application.require("app/controllers/" + this.controller + "_controller");
	res.send(controller.call(this.action));
};

// constructor

var Router = function(block) {

	// public instance variables

	var routes = [];

	// private instance variables

	var router = this;

	/*
	 * DSL definitions can get kind of big.
	 * if your editor supports folding, now's
	 * the time to use it.
	 */
	var dsl = new DSL(function() {
		var methods = ["get", "post", "put", "patch", "delete"];

		var dsl = this;

		this.route = function(methods, path) {
			return {
				to: function(action, options) {
					// seperate the controller and action.
					action = action.split('#');
					var controller = action.shift();
					action = action.join('#');

					methods.splat().forEach(function(method) {
						var route = new Route({
							method: method,
							path: path,
							controller: controller,
							action: action
						});

						routes.push(route);
					});
				}
			};
		};

		methods.forEach(function(method) {
			this[method] = function(path) {
				return dsl.route(method, path);
			};
		});

		this.root = function(action, options) {
			this.get('/', action, options);
		};
	});

	dsl.call(block);

	// public instance methods

	this.express = function(app) {
		routes.forEach(function(route) {
			app[route.method](route.path, function() {
				var expressArgs = Array.prototype.slice.call(arguments);
				expressHandler.apply(route, expressArgs);
			});
		});
	};
};

Router.Route = Route;

module.exports = Router;
