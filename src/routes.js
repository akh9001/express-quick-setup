const fs = require('fs');
const path = require('path');

/**
 * Dynamically register all routes from a given folder.
 * @param {object} app - The Express app instance.
 * @param {string} routesPath - The path to the routes folder.
 */
function registerRoutes(app, routesPath) {
	fs.readdirSync(routesPath).forEach((file) => {
		const route = require(path.join(routesPath, file));
		const routePath = `/${file.split('.')[0]}`; // Use filename as route path.
		app.use(routePath, route);
	});
}

module.exports = registerRoutes;
