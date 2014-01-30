require("colors");
var S = require("string");

var log = function(message, out) {
	console[out || "log"]("\n" + indent(message));
};

var indent = function(str, width) {
	return str.split(/\r?\n/).map(function(line) {
		return S(" ").times(width || 2).s + line;
	}).join("\n");
};

module.exports = {
	error: function(message) {
		log(("Error: " + message).red, "error");
	},

	success: function(message) {
		log(message.green);
	}
}
