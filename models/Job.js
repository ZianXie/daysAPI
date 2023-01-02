import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, 'no company name provided!!!'],
            maxlength: 50
        },
        position: {
            type: String,
            required: [true, 'No position provided!!!'],
            maxlength: 100
        },
        status: {
            type: String,
            enum: ['interview', 'declined', 'pending'],
            default: 'pending'
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'a user is needed for this doc'],
        }
    }, { timestamps: true }
)

const Job = mongoose.model('Job', JobSchema)
export default Job