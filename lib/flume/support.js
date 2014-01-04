var _ = require("lodash");

var Support = {
	addInstanceMethod: function(klass, methodName, method) {

		/*
		 * use defineProperty instead of assigning directly to
		 * prototype so that methods are non-enumberable.
		 */
		Object.defineProperty(klass.prototype, methodName, {
			get: function() {
				return method;
			}
		});
	}
};

/*
 * .splat() returns the array if the object is an array,
 * otherwise wraps the object in an array and returns the array.
 */
Support.addInstanceMethod(Object, 'splat', function() {
	if (_.isArray(this)) return this;
	return [this];
});

Support.addInstanceMethod(Number, 'times', function(fn) {
	for (var i = 0; i < this; i++) {
		fn(i);
	}
});

module.exports = Support;