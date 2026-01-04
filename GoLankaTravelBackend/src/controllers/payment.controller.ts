import { Request, Response, NextFunction } from 'express'
import Stripe from 'stripe'
import crypto from 'crypto' // Native Node.js module for hashing
import AppError from '../utils/appError'
import { sendResponse } from '../utils/apiResponse'

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as any,
})

/**
 * @desc    Process Payment via Stripe
 * @route   POST /api/v1/payment/stripe/process
 * @access  Private (User)
 */
export const processStripePayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { amount } = req.body

    if (!amount) {
      return next(new AppError('Payment amount is required', 400))
    }

    const myPayment = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'lkr',
      metadata: {
        company: 'GoLanka Travel',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    sendResponse(res, 200, true, 'Payment Intent Created', {
      client_secret: myPayment.client_secret,
    })

  } catch (error: any) {
    next(new AppError('Stripe Error: ' + error.message, 500))
  }
}

/**
 * @desc    Send Stripe API Key to Frontend
 * @route   GET /api/v1/payment/stripe/apikey
 * @access  Private (User)
 */
export const sendStripeApiKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    sendResponse(res, 200, true, 'Stripe API Key sent', {
      stripeApiKey: process.env.STRIPE_API_KEY,
    })
  } catch (error: any) {
    next(error)
  }
}

/**
 * @desc    Generate PayHere Hash (For Sri Lankan LKR Payments)
 * @route   POST /api/v1/payment/payhere/hash
 * @access  Private (User)
 */
export const generatePayHereHash = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { order_id, amount, currency } = req.body
    
    const merchantId = process.env.PAYHERE_MERCHANT_ID
    const merchantSecret = process.env.PAYHERE_SECRET

    if (!merchantId || !merchantSecret) {
      return next(new AppError('PayHere credentials missing on server', 500))
    }

    // 1. Format amount to 2 decimal places (required by PayHere)
    const formattedAmount = parseFloat(amount).toFixed(2)

    // 2. Create inner hash: md5(merchant_secret)
    const hashedSecret = crypto
      .createHash('md5')
      .update(merchantSecret)
      .digest('hex')
      .toUpperCase()

    // 3. Create final hash string
    const hashString = `${merchantId}${order_id}${formattedAmount}${currency}${hashedSecret}`

    // 4. Generate final hash
    const hash = crypto
      .createHash('md5')
      .update(hashString)
      .digest('hex')
      .toUpperCase()

    sendResponse(res, 200, true, 'PayHere Hash Generated', {
      hash,
      merchantId
    })

  } catch (error: any) {
    next(error)
  }
}