const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

/**
 * Configure middlewares for an Express app.
 * @param {object} app - The Express app instance.
 */
function setupMiddlewares(app) {
	app.use(bodyParser.json());
	app.use(cors());
	app.use(morgan('dev'));
}

module.exports = setupMiddlewares;
