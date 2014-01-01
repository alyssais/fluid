module.exports = new Flume.Controller(function() {
	action("index", function() {
		return "the index action of posts controller was called.";
	});
});
