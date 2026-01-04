import express from 'express'
import {
  createOrder,
  getOrderById,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} from '../controllers/order.controller'
import { protect } from '../middleware/auth.middleware'
import { authorize } from '../middleware/role.middleware'

const router = express.Router()


router.use(protect)


// --- User Routes ---

/**
 * @route   POST /api/v1/orders/create
 * @desc    Create a new order (usually after payment)
 * @access  Private (User)
 */
router.post('/create', createOrder)

/**
 * @route   GET /api/v1/orders/myorders
 * @desc    Get logged-in user's order history
 * @access  Private (User)
 */
router.get('/myorders', myOrders)


// --- Admin Routes ---

/**
 * @route   GET /api/v1/orders/admin/all
 * @desc    Get all orders
 * @access  Private (Admin)
 */
router.get('/admin/all', authorize('admin'), getAllOrders)

/**
 * @route   PUT /api/v1/orders/admin/:id
 * @desc    Update order status (e.g., Delivered)
 * @access  Private (Admin)
 */
router.put('/admin/:id', authorize('admin'), updateOrderStatus)

/**
 * @route   DELETE /api/v1/orders/admin/:id
 * @desc    Delete an order
 * @access  Private (Admin)
 */
router.delete('/admin/:id', authorize('admin'), deleteOrder)


// --- Generic ID Routes (Must be last) ---

/**
 * @route   GET /api/v1/orders/:id
 * @desc    Get single order details
 * @access  Private (Owner or Admin)
 */
router.get('/:id', getOrderById)

export default router