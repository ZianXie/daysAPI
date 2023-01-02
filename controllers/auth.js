import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'



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
    res.end('You\'ve hit the login controller')
}

export { register, login }