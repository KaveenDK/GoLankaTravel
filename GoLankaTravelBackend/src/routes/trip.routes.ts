import express from 'express'
import {
  createTrip,
  getAllTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  getTripPdf
} from '../controllers/trip.controller'
import { protect } from '../middleware/auth.middleware'
import { authorize } from '../middleware/role.middleware'

const router = express.Router()


/**
 * @route   GET /api/v1/trips/all
 * @desc    Get all trips (with filtering & sorting)
 * @access  Public
 */
router.get('/all', getAllTrips)

/**
 * @route   GET /api/v1/trips/:id
 * @desc    Get single trip details
 * @access  Public
 */
router.get('/:id', getTripById)


/**
 * @route   POST /api/v1/trips/:id/pdf
 * @desc    Generate PDF Itinerary
 * @access  Private (User/Admin)
 */
router.post('/:id/pdf', protect, getTripPdf)


/**
 * @route   POST /api/v1/trips/save
 * @desc    Create a new trip
 * @access  Private (Admin)
 */
router.post('/save', protect, authorize('admin'), createTrip)

/**
 * @route   PUT /api/v1/trips/update/:id
 * @desc    Update trip details
 * @access  Private (Admin)
 */
router.put('/update/:id', protect, authorize('admin'), updateTrip)

/**
 * @route   DELETE /api/v1/trips/delete/:id
 * @desc    Delete a trip
 * @access  Private (Admin)
 */
router.delete('/delete/:id', protect, authorize('admin'), deleteTrip)

export default router