import errors from '../errors/index.js'
import StatusCodes from 'http-status-codes'
const errorHandlerMiddleware = (err, req, res, next) => {
	console.log('error handler middleware working...');


	//build a custom error
	let customError = {
		//set default
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Something went wrong!',
	}


	//catch the badRequest, notFound and unauthenticated
	if (err instanceof errors.CustomAPIError) {
		return res.status(err.statusCode).json({ msg: err.message })
	}



	//catch mongoose duplicated value error
	if (err.code && err.code === 11000) {
		customError.msg = `Duplicated ${Object.keys(err.keyValue)}, choose another value`
		customError.statusCode = 400
	}

	return res.status(customError.statusCode).json({ msg: customError.msg })
}

export default errorHandlerMiddleware
