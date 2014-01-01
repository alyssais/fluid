module.exports = {
	Flume:  require("./flume"),
	Fluent: require("./fluent"),
	Application: require("./application")
};

// Make everything accessible under the Fluid namespace too.
module.exports.Fluid = module.exports;
