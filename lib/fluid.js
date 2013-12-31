module.exports = {
	Flume:  Flume,
	Fluent: Fluent
};

/*
 * Loop through module.exports and make the individual
 * fluid components global unless an override (GLOBAL.fluid)
 * has been set. (This is kind of a no-conflict mode.)
 */
if (GLOBAL.Fluid !== false) {
	for (mod in module.exports) {
		if (module.exports.hasOwnProperty(mod)) {
			GLOBAL[mod] = module.exports[mod];
		}
	}
}
