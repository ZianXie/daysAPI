import jwt from 'jsonwebtoken'
import errors from '../errors/index.js'

const auth = async (req, res, next) => {
    //check header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new errors.UnauthenticatedError('Authnetication invalid')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        //attach the user to the job routes
        req.user = { userID: payload.mongoDocID, name: payload.name }
        next()
    } catch (error) {
        throw new errors.UnauthenticatedError('Authorization invalid, jwtVerify')
    }
}

export default auth