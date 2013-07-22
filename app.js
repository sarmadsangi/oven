var requirejs = require('requirejs');

requirejs.config({
	// Pass the top-level main.js/index.js require
	// function to requirejs so that node modules
	// are loaded relative to the top-level JS file.
	nodeRequire: require
});


requirejs(['config', 'express', 'http-proxy', 'oven'],
function(config, express, httpProxy,  oven) {
	var app = express();

	app.get('/', oven.bake);

	app.listen(config.port);
});
