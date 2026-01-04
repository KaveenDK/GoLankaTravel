import express from 'express'
import { handlePayHereWebhook, handleStripeWebhook } from '../controllers/webhook.controller'

const router = express.Router()

/**
 * @route   POST /api/v1/webhooks/payhere
 * @desc    Receive payment notification from PayHere
 * @access  Public (Validated by MD5 Signature)
 */
// Use express.urlencoded because PayHere sends form-data
router.post('/payhere', express.urlencoded({ extended: true }), handlePayHereWebhook)

/**
 * @route   POST /api/v1/webhooks/stripe
 * @desc    Receive payment notification from Stripe
 * @access  Public (Validated by Stripe Signature)
 */

router.post('/stripe', express.raw({ type: 'application/json' }), handleStripeWebhook)

export default router