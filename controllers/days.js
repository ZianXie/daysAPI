import Day from '../models/Day.js'
import { StatusCodes } from 'http-status-codes'
import errors from '../errors/index.js'
import { isDateValid } from '../functions/date.js'

const getAllDays = async (req, res) => {
    console.log('You\'ve hit the getAllDays controller')
    const days = await Day.find({ createdByUser: req.user.userID }).sort('createdAt')
    res.status(StatusCodes.OK).json({ User: req.user.name, nbHits: days.length, days })
}

const getDay = async (req, res) => {
    console.log('You\'ve hit the getDay controller')
    const { user: { userID: userID }, params: { id: dayID } } = req
    // console.log(req.user);
    const day = await Day.findOne({ _id: dayID, createdByUser: userID })

    if (!day) {
        throw new errors.NotFoundError('no day with such day id')
    }

    res.status(StatusCodes.OK).json(day)

}

const createDay = async (req, res) => {
    console.log('You\'ve hit the createDay controller')

    req.body.createdByUser = req.user.userID
    if (!req.body.date || !isDateValid(req.body.date)) {
        throw new errors.BadRequestError('no valid date provided')
    } else if (!req.body.description || typeof(req.body.description) !== 'string') {
        throw new errors.BadRequestError('no valid description provided')
    }
    else {
        const day = await Day.create(req.body)
        res.status(StatusCodes.CREATED).json({ day })
    }
}

const updateDay = async (req, res) => {
    console.log('You\'ve hit the updateDay controller')
    const {
        body: { company, position },
        user: { userID },
        params: { id: dayId },
    } = req

    if (company === '' || position === '') {
        throw new errors.BadRequestError('Company or Position fields cannot be empty')
    }
    const day = await Day.findByIdAndUpdate(
        { _id: dayId, createdByUser: userID },
        req.body,
        { new: true, runValidators: true }
    )
    if (!day) {
        throw new errors.NotFoundError(`No day with id ${dayId}`)
    }
    res.status(StatusCodes.OK).json({ day })
}

const deleteDay = async (req, res) => {
    console.log('You\'ve hit the deleteDay controller')

    const {
        params: { id: dayID },
        user: { userID }
    } = req

    const day = await Day.findByIdAndDelete(
        { _id: dayID, createdByUser: userID },
    )

    if (!day) {
        throw new errors.NotFoundError('the day intended to delete doesn\'t exist')
    }

    res.status(StatusCodes.OK).json({ msg: 'deleted the following day', day })
}

export { getAllDays, getDay, createDay, updateDay, deleteDay }