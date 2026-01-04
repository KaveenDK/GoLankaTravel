import express from 'express'
import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import tripRoutes from './trip.routes'
import aiRoutes from './ai.routes'
import orderRoutes from './order.routes'
import paymentRoutes from './payment.routes'
import categoryRoutes from './category.routes'
import mapsRoutes from './maps.routes'
import webhookRoutes from './webhook.routes'
import adminRoutes from './admin.routes'

const router = express.Router()


// Auth: Register, Login, Google Auth
router.use('/auth', authRoutes)

// Users: Profile, Admin User Management
router.use('/users', userRoutes)

// Trips: Packages, Itineraries, PDF
router.use('/trips', tripRoutes)

// Categories: Trip Categories (e.g., Adventure, Honeymoon)
router.use('/categories', categoryRoutes)

// AI: Smart Planner, Chat
router.use('/ai', aiRoutes)

// Orders: Booking History, Order Management
router.use('/orders', orderRoutes)

// Payments: Stripe, PayHere Integration
router.use('/payment', paymentRoutes)

// Maps: Geocoding, Nearby Places
router.use('/maps', mapsRoutes)

// Webhooks: PayHere, Stripe
router.use('/webhooks', webhookRoutes)

// Admin: Dashboard, User Management
router.use('/admin', adminRoutes)

export default router