import mongoose from 'mongoose'

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
            maxlength: 20,
        },
    }
)

const User = mongoose.model('User', UserSchema)
export default User