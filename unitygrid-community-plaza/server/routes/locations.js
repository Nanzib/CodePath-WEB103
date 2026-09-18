// server/routes/locations.js
import express from 'express'
import * as LocationsController from '../controllers/locations.js'
import * as EventsController from '../controllers/events.js'

const router = express.Router()

router.get('/', LocationsController.getAllLocations)
router.get('/:locationId', LocationsController.getLocationById)

// endpoint to get events for a location
router.get('/:locationId/events', EventsController.getEventsByLocation)

export default router
