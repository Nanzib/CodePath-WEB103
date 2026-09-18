// server/controllers/locations.js
import { pool } from '../config/database.js'

export const getAllLocations = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM locations ORDER BY id')
    res.status(200).json(results.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getLocationById = async (req, res) => {
  const { locationId } = req.params
  try {
    const results = await pool.query('SELECT * FROM locations WHERE id = $1', [locationId])
    res.status(200).json(results.rows[0] || {})
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
