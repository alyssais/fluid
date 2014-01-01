var TemplateAdaptor = require("../template_adapter");
var Handlebars = require("handlebars");

module.exports = new TemplateAdaptor({
	compile: function(text) {
		return Handlebars.compile(text);
	},
	render: function(template, data) {
		return template(data);
	}
});
