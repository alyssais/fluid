var fs = require("fs");

module.exports = function(name) {
	fs.mkdir(name, function(error) {
		fs.mkdir(name + "/config", function(error) {
			var copyTemplate = function(location) {
				var read = fs.createReadStream(__dirname + '/templates/' + location);
				var write = fs.createWriteStream(name + "/" + location);
				read.pipe(write);
			};

			['config/application.js', 'config/routes.js'].forEach(copyTemplate);
		});

		fs.mkdir(name + "/app", function(error) {
			fs.mkdir(name + "/app/controllers");
			fs.mkdir(name + "/app/views");
			fs.mkdir(name + "/app/public");
		});
	});
}
