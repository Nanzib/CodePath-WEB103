// server/controllers/events.js
import { pool } from '../config/database.js'

export const getAllEvents = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM events ORDER BY date ASC')
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getEventById = async (req, res) => {
  const { eventId } = req.params
  try {
    const results = await pool.query('SELECT * FROM events WHERE id = $1', [eventId])
    res.status(200).json(results.rows[0] || {})
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getEventsByLocation = async (req, res) => {
  const { locationId } = req.params
  try {
    const results = await pool.query('SELECT * FROM events WHERE location_id = $1 ORDER BY date ASC', [locationId])
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
