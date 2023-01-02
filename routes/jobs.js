import { getAllJobs, getJob, createJob, updateJob, deleteJob } from '../controllers/jobs.js'
import express from 'express'

const jobsRouter = express.Router()

jobsRouter.route('/').get(getAllJobs)
jobsRouter.route('/:id').get(getJob).post(createJob).patch(updateJob).delete(deleteJob)

export default jobsRouter