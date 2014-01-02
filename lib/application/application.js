var express = require("express");
var fs = require("fs");
var Router = require("../flume/router");

var Application = function(configPath) {

	this.path = fs.realpathSync(configPath + "/..");

	// initialization
	this.expressServer = express();

	this.router = require(this.path + "/config/routes");
	this.router.express(this.expressServer);

	// public instance methods

	this.expandPath = function(path) {
		// FIXME: this appending is bad.
		// do something fancy with fs.
		return this.path + '/' + path;
	};

	this.server = function() {
		this.express.listen(3000);
	};

	// finalize setup

	Fluid.application = this;

};

module.exports = Application;
