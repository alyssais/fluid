var _ = require("lodash");

var newApply = function(fn, thisArg, args) {
	var applied = fn.bind.apply(fn, [thisArg].concat(args));
	return new applied;
};

var DSL = function(dslMethods) {
	var dsl = function(block) {
		var methods = _.isFunction(dslMethods) ? new dslMethods : dslMethods;
		var body = 'return new (' + block.toString().replace(/\s+$/, '') + ')()';
		var pairs = _.pairs(methods);
		var args = pairs.map(_.first);
		var imps = pairs.map(_.last);
		var fn = newApply(Function, null, args.concat(body));
		return newApply(fn, this, imps);
	};

	return dsl;
};

module.exports = DSL;
