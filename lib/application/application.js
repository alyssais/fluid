var express = require("express");
var fs = require("fs");
var Router = require("../flume/router");

var Application = function(configPath) {

	this.path = fs.realpathSync(configPath + "/..");

	// initialization
	this.expressServer = express();

	this.router = require(this.path + "/config/routes");
	this.router.express(this.expressServer);

	this.expressServer.listen(3000);

};

module.exports = Application;
