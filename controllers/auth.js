import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'


const register = async (req, res) => {
    console.log('hit register middleware...');
    const user = await User.create({ ...req.body })
    const token = jwt.sign({ mongoDocID: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '30d' })
    res.status(StatusCodes.CREATED).json({ username: user.name, token })
}

const login = async (req, res) => {
    res.end('You\'ve hit the login controller')
}

export { register, login }