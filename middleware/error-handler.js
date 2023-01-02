import errors from '../errors/index.js'
import StatusCodes from 'http-status-codes'
const errorHandlerMiddleware = (err, req, res, next) => {
	console.log('error handler middleware working...');
	if (err instanceof errors.CustomAPIError) {
		return res.status(err.statusCode).json({ msg: err.message })
	}
	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

export default errorHandlerMiddleware
