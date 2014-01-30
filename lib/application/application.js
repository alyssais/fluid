var express = require("express");
var fs = require("fs");
var Router = require("../flume/router");
var EventEmitter = require("events").EventEmitter;

var Application = function(configPath) {
	
	// Inherit from EventEmitter.
	EventEmitter.call(this);

	this.path = fs.realpathSync(configPath + "/..");

	// initialization
	this.expressServer = express();

	this.router = require(this.path + "/config/routes");
	this.router.express(this.expressServer);

	this.logger = require("./logger");

	// public instance methods

	this.exit = function(error) {
		this.logger.error(error);

		// FIXME: 0 is probably not correct here.
		process.exit(0);
	};

	this.expandPath = function(path) {
		// FIXME: this appending is bad.
		// do something fancy with fs.
		return this.path + '/' + path;
	};

	this.server = function(port, callback) {
		this.expressServer.listen(port, function() {
			Fluid.application.logger.success("Fluid is running at http://localhost:" + port + "/ - yay!");
			callback && callback();
		}).on("error", function(error) {
			Fluid.application.exit("A server is already running on port " + port + "\n  Try again with a different port.");
		});
	};
	
	this.config = {};
	this.configure = function(configurator) {
		configurator.call(this.config);
	};

	// finalize setup

	Fluid.application = this;

};

module.exports = Application;
