// dependencies

var fs = require("fs");

// TODO: move this into Flume.Support.
Number.prototype.times = function(fn) {
	for (var i = 0; i < this; i++) {
		fn(i);
	}
};

// constructor

var View = function(templateFileName) {

	// public instance methods
	
	this.render = function(data, done) {
		fs.readFile(templateFileName, function(error, buffer) {
			if (error) {
				done(error);
				return;
			}

			var templateExts = templateFileName.split(".");
			templateExts.shift(); // filename
			templateExts.shift(); // format
			done(null, renderTemplate(templateExts, buffer.toString(), data));
		});
	};
	
};

// private class variables

var adapters = {};

// private class methods

var renderTemplate = function(exts, text, data) {
	if (!exts.length) return text;

	var rendered = adapters[exts.shift()].compile(text).render(data);
	return renderTemplate(exts, rendered, data);
};

// public class methods

View.find = function(controller, action, callback) {
	var dir = Fluid.application.expandPath("app/views/" + controller);

	fs.readdir(dir, function(error, files) {
		if (error) {
			callback(error);
			return;
		}

		files = files.filter(function(file) {
			return !!file.match(new RegExp("^" + action));
		});

		if (files.length > 1) {
			callback(new Error("More than one template were found for " + controller + "/" + action));
			return;
		}

		callback(null, new View(dir + "/" + files[0]));
	});
};

View.registerTemplateAdapter = function(extension, block) {
	adapters[extension] = block;
};

// register default template adapters

View.registerTemplateAdapter("handlebars", require("./template_adapters/handlebars"));

module.exports = View;
