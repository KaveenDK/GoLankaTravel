import express from 'express'
import { 
  processStripePayment, 
  sendStripeApiKey, 
  generatePayHereHash 
} from '../controllers/payment.controller'
import { protect } from '../middleware/auth.middleware'

const router = express.Router()


// Apply protection to all payment routes
router.use(protect)

/**
 * @route   GET /api/v1/payment/stripe/apikey
 * @desc    Get Stripe Publishable Key (for Frontend)
 * @access  Private
 */
router.get('/stripe/apikey', sendStripeApiKey)

/**
 * @route   POST /api/v1/payment/stripe/process
 * @desc    Create Stripe Payment Intent
 * @access  Private
 */
router.post('/stripe/process', processStripePayment)

/**
 * @route   POST /api/v1/payment/payhere/hash
 * @desc    Generate PayHere Security Hash (MD5)
 * @access  Private
 */
router.post('/payhere/hash', generatePayHereHash)

export default router