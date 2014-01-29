module.exports = new Flume.Controller(function() {
  before(function() {
    console.log("before all action was called");
  });

  before('index', function() {
    console.log("before index action was called.")
  });

	this.index = function() {
    console.log("index action was called.");

    // data assigned to `this` will be passed to the view.
		this.posts = [{
			title: "Hello world",
			content: "Lorem ipsum dolor sit amet."
		},{
			title: "Foo bar",
			content: "This is fun."
		}];
	};

  after(function() {
    console.log("after all action was called.");
  });

  after('index', function() {
    console.log("after index action was called.");
  });
});

