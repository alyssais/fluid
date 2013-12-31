var Flume = require("../../lib/flume");

var UsersController = new Flume.Controller('Users', function() {
	action('new', function() {
		console.log("hello world");
	});
});

UsersController.call('new');

module.exports = UsersController;
