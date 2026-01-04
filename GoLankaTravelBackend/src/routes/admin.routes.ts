import express from 'express'
import { 
  getDashboardStats, 
  getAllUsers, 
  deleteUser 
} from '../controllers/admin.controller'
import { protect, restrictTo } from '../middleware/auth.middleware'

const router = express.Router()

// --- GLOBAL PROTECTION ---
// All routes below this line require Login AND Admin Role
router.use(protect)
router.use(restrictTo('admin'))

/**
 * @route   GET /api/v1/admin/stats
 * @desc    Get total revenue, users, orders
 */
router.get('/stats', getDashboardStats)

/**
 * @route   GET /api/v1/admin/users
 * @desc    List all registered users
 */
router.get('/users', getAllUsers)

/**
 * @route   DELETE /api/v1/admin/users/:id
 * @desc    Ban/Delete a user
 */
router.delete('/users/:id', deleteUser)

export default router