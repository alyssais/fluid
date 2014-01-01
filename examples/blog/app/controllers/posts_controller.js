module.exports = new Flume.Controller(function() {
	this.index = function() {
		this.posts = [{
			title: "Hello world",
			content: "Lorem ipsum dolor sit amet."
		},{
			title: "Foo bar",
			content: "This is fun."
		}];
	};
});
