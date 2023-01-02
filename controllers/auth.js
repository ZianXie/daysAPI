import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcryptjs'


const register = async (req, res) => {
    const { name, email, password } = req.body


    const salt = await bcrypt.genSalt(10)
    const hasedPassword = await bcrypt.hash(password, salt)

    const tempUser = { name, email, password: hasedPassword }



    const user = await User.create({ ...tempUser })
    res.status(StatusCodes.CREATED).json(tempUser)
}

const login = async (req, res) => {
    res.end('You\'ve hit the login controller')
}

export { register, login }