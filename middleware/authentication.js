import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import errors from '../errors/index.js'

const auth = async (req, res, next) => {
    console.log('auth middleware working...');
    //check header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new errors.UnauthenticatedError('Authnetication invalid')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)


        // //another way to get user
        // const user = User.findById(payload.mongoDocId).select('-password')      //no password passed.
        // req.user = user



        //attach the user to the job routes
        req.user = { userID: payload.mongoDoc_userID, name: payload.name }
        next()
    } catch (error) {
        throw new errors.UnauthenticatedError('Authorization invalid, jwtVerify')
    }
}

export default auth