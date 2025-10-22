// server/routes/customitems.js
import express from 'express'
import {
  getAllCustomItems,
  getCustomItemById,
  createCustomItem,
  updateCustomItem,
  deleteCustomItem
} from '../controllers/customitems.js'

const router = express.Router()

router.get('/', getAllCustomItems)
router.get('/:id', getCustomItemById)
router.post('/', createCustomItem)
router.patch('/:id', updateCustomItem)
router.delete('/:id', deleteCustomItem)

export default router
