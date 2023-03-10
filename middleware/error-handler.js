// import errors from '../errors/index.js'
import StatusCodes from 'http-status-codes'
const errorHandlerMiddleware = (err, req, res, next) => {
	console.log('error handler middleware working...');


	//build a custom error
	let customError = {
		//set default
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Something went wrong!',
	}



	/* (loses effect after custmError in place)
	catch the badRequest, notFound and unauthenticated
	 */
	// if (err instanceof errors.CustomAPIError) {
	// 	return res.status(err.statusCode).json({ msg: err.message })
	// }



	//catch cast syntax error
	if (err.name === 'CastError') {
		// console.log(err);
		customError.msg = `No item found with id: ${err.value._id}`
		customError.statusCode = 404
	}




	//catch userSchema validation errors
	if (err.name === 'ValidationError') {
		customError.msg = Object.values(err.errors)
			.map(
				(item) => item.message
			)
			.join(', ')
		customError.statusCode = 400
	}



	//catch mongoose duplicated value error
	if (err.code && err.code === 11000) {
		customError.msg = `Duplicated ${Object.keys(err.keyValue)}, choose another value`
		customError.statusCode = 400
	}



	// return res.status(customError.statusCode).json({ err })
	return res.status(customError.statusCode).json({ msg: customError.msg })
}

export default errorHandlerMiddleware
