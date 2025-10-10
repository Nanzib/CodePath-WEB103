// server/routes/events.js
import express from 'express'
import * as EventsController from '../controllers/events.js'

const router = express.Router()

router.get('/', EventsController.getAllEvents)
router.get('/:eventId', EventsController.getEventById)

export default router
