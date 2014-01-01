// dependencies

var sha1 = require("sha1");

// constructor

var TemplateAdapter = function(config) {

	// private instance variables

	/*
	 * cache compiled templates.
	 *
	 * templates will only be cached if `config`
	 * has a `compile` function defined, and
	 * if `config` does not have a `caching`
	 * property set to false.
	 */
	// keys are template source hashes.
	// values are compiled templates.
	var templates = {};

	// public instance methods

	this.compile = function(text) {

		var template = text;

		if (config.compile) {

			var hash = sha1(text);
			var cache = templates[hash];

			if (config.caching === false || !cache) {
				template = config.compile(text);
			} else {
				template = cache;
			}

			if (config.caching !== false) {
				templates[hash] = template;
			}

		}

		return { render: function(data) {

			return config.render(template, data);

		} };

	};

};

module.exports = TemplateAdapter;
