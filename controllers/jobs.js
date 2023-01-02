import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes'
import errors from '../errors/index.js'


const getAllJobs = async (req, res) => {
    console.log('You\'ve hit the getAllJobs controller')
    const jobs = await Job.find({ createdByUser: req.user.userID }).sort('createdAt')
    res.status(StatusCodes.OK).json({ nbHits: jobs.length, jobs })
}

const getJob = (req, res) => {
    res.send('You\'ve hit the getJob controller')
}

const createJob = async (req, res) => {
    console.log('You\'ve hit the createJob controller')

    req.body.createdByUser = req.user.userID
    // console.log(req.body.createdBy);
    const job = await Job.create(req.body)

    res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = (req, res) => {
    res.send('You\'ve hit the updateJob controller')
}

const deleteJob = (req, res) => {
    res.send('You\'ve hit the deleteJob controller')
}

export { getAllJobs, getJob, createJob, updateJob, deleteJob }