import { getAllDays, getDay, createDay, updateDay, deleteDay } from '../controllers/Days.js'
import express from 'express'

const DaysRouter = express.Router()

DaysRouter.route('/').get(getAllDays).post(createDay)
DaysRouter.route('/:id').get(getDay).patch(updateDay).delete(deleteDay)

export default DaysRouter