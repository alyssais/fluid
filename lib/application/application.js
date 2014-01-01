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

	this.require = function(path) {
		// FIXME: this appending is bad.
		// do something fancy with fs.
		return require(this.path + '/' + path);
	};

	// finalize setup

	Fluid.application = this;
	this.expressServer.listen(3000);

};

module.exports = Application;
