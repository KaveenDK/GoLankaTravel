import { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'
import Stripe from 'stripe'
import Order, { IOrder } from '../models/Order.model'
import { IUser } from '../models/User.model'
import { sendEmail } from '../services/email.service'

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-11-17.clover' as any,
})

/**
 * Handle PayHere Webhook
 */
export const handlePayHereWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      merchant_id,
      order_id,
      payment_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig
    } = req.body

    // 1. Validate Merchant
    if (merchant_id !== process.env.PAYHERE_MERCHANT_ID) {
      return res.status(400).send('Invalid Merchant ID')
    }

    // 2. Validate Signature
    const secretHash = crypto
      .createHash('md5')
      .update(process.env.PAYHERE_SECRET as string)
      .digest('hex')
      .toUpperCase()

    const dataString = `${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${secretHash}`
    
    const localSig = crypto
      .createHash('md5')
      .update(dataString)
      .digest('hex')
      .toUpperCase()

    if (localSig !== md5sig) {
      return res.status(400).send('Signature Verification Failed')
    }

    // 3. Process Success
    if (status_code === '2') {
      const order = await Order.findById(order_id).populate<{ user: IUser }>('user')

      if (order) {
        order.orderStatus = 'Confirmed'
        order.paymentInfo = {
          id: payment_id,
          status: 'Paid'
        }
        
        await order.save()

        const userEmail = order.user ? (order.user as IUser).email : 'user@example.com'

        await sendEmail(
          userEmail, 
          'Payment Confirmed!',
          `Your trip order ${order_id} has been confirmed via PayHere. Enjoy your trip!`
        )
      }
    }

    res.status(200).send('Webhook Received')

  } catch (error: any) {
    console.error('PayHere Webhook Error:', error.message)
    res.status(500).send('Server Error')
  }
}

/**
 * Handle Stripe Webhook
 */
export const handleStripeWebhook = async (req: Request, res: Response, next: NextFunction) => {
  const sig = req.headers['stripe-signature'] as string
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET as string
    )

  } catch (err: any) {
    console.error(`❌ Stripe Webhook Error: ${err.message}`)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const orderId = session.metadata?.orderId

    if (orderId) {
      try {
        const order = await Order.findById(orderId).populate<{ user: IUser }>('user')

        if (order) {
          order.orderStatus = 'Confirmed'
          order.paymentInfo = {
            id: session.id,
            status: 'Paid'
          }
          
          await order.save()
          
          console.log(`✅ Order ${orderId} updated to Paid via Stripe`)

          // Prepare Email Details
          const userEmail = order.user ? (order.user as IUser).email : session.customer_details?.email
          const amountPaid = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00'
          const currency = session.currency?.toUpperCase() || 'USD'

          if (userEmail) {
            await sendEmail(
              userEmail,
              'Booking Confirmed - GoLanka Travel',
              `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                  <h1 style="color: #4F46E5;">Payment Successful! 🎉</h1>
                  <p>Hi there,</p>
                  <p>Great news! Your payment for <strong>Order #${orderId}</strong> was successful.</p>
                  
                  <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 5px 0;"><strong>Amount Paid:</strong> ${amountPaid} ${currency}</p>
                    <p style="margin: 5px 0;"><strong>Transaction ID:</strong> ${session.id}</p>
                  </div>
                  
                  <p>Best Regards,<br/><strong>The GoLanka Team</strong></p>
                </div>
              `
            )
            console.log(`📧 Confirmation email sent to ${userEmail}`)
          }
        }
      } catch (err: any) {
        console.error(`❌ Error updating order: ${err.message}`)
      }
    }
  }

  res.json({ received: true })
}