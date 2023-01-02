import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

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
        this.password = bcrypt.hash(this.password.salt)
        next()
    }
)


const User = mongoose.model('User', UserSchema)
export default User