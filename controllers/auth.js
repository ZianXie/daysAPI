import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcryptjs'


const register = async (req, res) => {

    const user = await User.create({ ...req.body })
    res.status(StatusCodes.CREATED).json(req.body)
}

const login = async (req, res) => {
    res.end('You\'ve hit the login controller')
}

export { register, login }