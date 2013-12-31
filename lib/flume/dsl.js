var _ = require("lodash");

var DSL = function(methodsBuilder) {
	this.methods = new methodsBuilder;
};

DSL.prototype.call = function(block) {
	var body = '(' + block.toString().replace(/\s+$/, '') + ')()';
	var pairs = _.pairs(this.methods);
	var args = pairs.map(_.first);
	var imps = pairs.map(_.last);
	var fnConstructor = Function.bind.apply(Function, [null].concat(args).concat(body));
	var fn = new fnConstructor();
	return fn.apply(this, imps);
};

module.exports = DSL;
