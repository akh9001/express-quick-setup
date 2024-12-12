const setupMiddlewares = require('./middlewares');
const errorHandler = require('./errorHandler');
const registerRoutes = require('./routes');

/**
 * Quick setup function for Express apps.
 * @param {object} app - The Express app instance.
 * @param {object} options - Configuration options.
 */
function quickSetup(app, options = {}) {
	setupMiddlewares(app);

	if (options.routesPath) {
		registerRoutes(app, options.routesPath);
	}

	app.use(errorHandler);
}

module.exports = quickSetup;
