define([
	'underscore', 'node-cache', 'zombie'
], function (_, NodeCache, Zombie) {
	var Actions = {},
	config = {},
	myCache = new NodeCache({stdTTL: 86400});



	Actions.bake = function (req, res, callback) {
		var result = '',
		href = req.param('href'),
		browser = new Zombie();


		if (href) {
			myCache.get(href, function (err, val) {
				val = val[href];
				if (val) {
					res.send(val);
				} else {
					browser.visit(href, {
						loadCSS: false
					}, function () {
						browser.wait(1000, function () {
							result =  browser.html();
							res.send(result);
							myCache.set(href, result);
						});
			 		});

				}
			});

		} else {

		}


	};

	return Actions;
});
