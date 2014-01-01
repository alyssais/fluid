module.exports = new Flume.Router(function() {
	get('/').to('posts#index');
});
