/**
 * Default error handler middleware.
 * @param {object} err - The error object.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {function} next - The next middleware function.
 */
function errorHandler(err, req, res, next) {
	console.error(err.stack);
	res.status(err.status || 500).json({
		error: {
			message: err.message || 'Internal Server Error',
		},
	});
}

module.exports = errorHandler;
