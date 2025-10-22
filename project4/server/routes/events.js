// server/routes/events.js
import express from 'express'
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    res.status(200).json([])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  res.status(200).json({ error: 'Not implemented', id: req.params.id })
})

export default router
