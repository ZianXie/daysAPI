import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import errors from '../errors/index.js'



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

    if (!email || !password) {
        throw new errors.BadRequestError('email or password not provided!!!')
    }

    const user = await User.findOne({ email })


    if (!user) {
        throw new errors.UnauthenticatedError('Invalid credentials')
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