import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes'
import errors from '../errors/index.js'


const getAllJobs = async (req, res) => {
    console.log('You\'ve hit the getAllJobs controller')
    const jobs = await Job.find({ createdByUser: req.user.userID }).sort('createdAt')
    res.status(StatusCodes.OK).json({ User: req.user.name, nbHits: jobs.length, jobs })
}

const getJob = async (req, res) => {
    console.log('You\'ve hit the getJob controller')
    const { user: { userID: userID }, params: { id: jobID } } = req
    // console.log(req.user);
    const job = await Job.findOne({ _id: jobID, createdByUser: userID })

    if (!job) {
        throw new errors.NotFoundError('no job with such job id')
    }

    res.status(StatusCodes.OK).json(job)

}

const createJob = async (req, res) => {
    console.log('You\'ve hit the createJob controller')

    req.body.createdByUser = req.user.userID
    // console.log(req.body.createdBy);
    const job = await Job.create(req.body)

    res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
    console.log('You\'ve hit the updateJob controller')
    const {
        body: { company, position },
        user: { userID },
        params: { id: jobId },
    } = req

    if (company === '' || position === '') {
        throw new errors.BadRequestError('Company or Position fields cannot be empty')
    }
    const job = await Job.findByIdAndUpdate(
        { _id: jobId, createdByUser: userID },
        req.body,
        { new: true, runValidators: true }
    )
    if (!job) {
        throw new errors.NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
    console.log('You\'ve hit the deleteJob controller')

    const {
        params: { id: jobID },
        user: { userID }
    } = req

    const job = await Job.findByIdAndDelete(
        { _id: jobID, createdByUser: userID },
    )

    if (!job) {
        throw new errors.NotFoundError('the job intended to delete doesn\'t exist')
    }

    res.status(StatusCodes.OK).json({ msg: 'deleted the following job', job })
}

export { getAllJobs, getJob, createJob, updateJob, deleteJob }