var _ = require("lodash");

var DSL = function(methodsBuilder) {
	this.methods = new methodsBuilder;
};

var newApply = function(fn, thisArg, args) {
	var applied = fn.bind.apply(fn, [thisArg].concat(args));
	return new applied;
};

DSL.prototype.call = function(block) {
	var body = 'return new (' + block.toString().replace(/\s+$/, '') + ')()';
	var pairs = _.pairs(this.methods);
	var args = pairs.map(_.first);
	var imps = pairs.map(_.last);
	var fn = newApply(Function, null, args.concat(body));
	return newApply(fn, this, imps);
};

module.exports = DSL;
