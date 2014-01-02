require("colors");

var log = function(message, out) {
	console[out || "log"]("\n  " + message + "\n");
};

module.exports = {
	error: function(message) {
		log(("Error: " + message).red, "error");
	},

	success: function(message) {
		log(message.green);
	}
}
