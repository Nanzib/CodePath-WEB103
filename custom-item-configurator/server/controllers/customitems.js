// server/controllers/customitems.js
import { pool } from '../config/database.js'

// GET /api/customitems
export const getAllCustomItems = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM customitems ORDER BY id')
    return res.status(200).json(results.rows)
  } catch (error) {
    console.error('getAllCustomItems error', error)
    return res.status(500).json({ error: error.message })
  }
}

// GET /api/customitems/:id
export const getCustomItemById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })

    const results = await pool.query('SELECT * FROM customitems WHERE id = $1', [id])
    if (!results.rows.length) return res.status(404).json({ error: 'Not found' })
    return res.status(200).json(results.rows[0])
  } catch (error) {
    console.error('getCustomItemById error', error)
    return res.status(500).json({ error: error.message })
  }
}

// POST /api/customitems
export const createCustomItem = async (req, res) => {
  try {
    const { name, feature_a, feature_b, feature_c, image, price, notes } = req.body

    // simple validation
    if (!name) return res.status(400).json({ error: 'name is required' })

    const results = await pool.query(
      `INSERT INTO customitems (name, feature_a, feature_b, feature_c, image, price, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [name, feature_a || null, feature_b || null, feature_c || null, image || null, price || null, notes || null]
    )

    return res.status(201).json(results.rows[0])
  } catch (error) {
    console.error('createCustomItem error', error)
    return res.status(500).json({ error: error.message })
  }
}

// PATCH /api/customitems/:id
export const updateCustomItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })

    const { name, feature_a, feature_b, feature_c, image, price, notes } = req.body

    const results = await pool.query(
      `UPDATE customitems SET
         name      = COALESCE($1, name),
         feature_a = COALESCE($2, feature_a),
         feature_b = COALESCE($3, feature_b),
         feature_c = COALESCE($4, feature_c),
         image     = COALESCE($5, image),
         price     = COALESCE($6, price),
         notes     = COALESCE($7, notes)
       WHERE id = $8
       RETURNING *`,
      [name ?? null, feature_a ?? null, feature_b ?? null, feature_c ?? null, image ?? null, price ?? null, notes ?? null, id]
    )

    if (!results.rows.length) return res.status(404).json({ error: 'Not found' })
    return res.status(200).json(results.rows[0])
  } catch (error) {
    console.error('updateCustomItem error', error)
    return res.status(409).json({ error: error.message })
  }
}

// DELETE /api/customitems/:id
export const deleteCustomItem = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' })

    const results = await pool.query('DELETE FROM customitems WHERE id = $1 RETURNING *', [id])
    if (!results.rows.length) return res.status(404).json({ error: 'Not found' })
    return res.status(200).json(results.rows[0])
  } catch (error) {
    console.error('deleteCustomItem error', error)
    return res.status(409).json({ error: error.message })
  }
}
