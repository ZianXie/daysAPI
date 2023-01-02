import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import errors from '../errors/index.js'
import UnauthenticatedError from '../errors/unauthenticated.js';



const register = async (req, res) => {
    console.log('hit register middleware...');
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json(
        {
            user: { name: user.name, email: user.email },
            token
        }
    )
}

const login = async (req, res) => {
    console.log('You\'ve hit the login controller')

    const { email, password } = req.body
    
    
    //chasing errors in controller
    if (!email || !password) {
        throw new errors.BadRequestError('email or password not provided!!!')
    }

    const user = await User.findOne({ email })


    if (!user) {
        throw new errors.UnauthenticatedError('Invalid credentials, no such user')
    }


    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid credentials, password incorrect')
    }


    const token = user.createJWT()
    res.status(StatusCodes.OK).json(
        {
            user: { name: user.name },
            token,
        }
    )
}

export { register, login }