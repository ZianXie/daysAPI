import mongoose from 'mongoose'

const DaySchema = new mongoose.Schema(
    {
        date: {
            type: String,
            required: [true, 'no date provided!!!'],
            maxlength: 10
        },
        description: {
            type: String,
            required: [true, 'no description provided!!!'],
            maxlength: 50
        },
        createdByUser: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'a user is needed for this doc'],
        }
    }, { timestamps: true }
)

const Day = mongoose.model('Day', DaySchema)
export default Day