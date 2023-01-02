import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'please provide name'],
            minlength: 3,
            maxlength: 20,
        },
        email: {
            type: String,
            required: [true, 'please provide email'],
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'please provide a valid email'
            ],
            minlength: 6,
            maxlength: 40,
            unique: true
        },
        password: {
            type: String,
            required: [true, 'please provide password'],
            minlength: 5,
            maxlength: 100,
        },
    }
)

UserSchema.pre(
    'save',
    async function (next) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
        next()
    }
)


UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { mongoDocID: this._id, name: this.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    )
}


const User = mongoose.model('User', UserSchema)
export default User