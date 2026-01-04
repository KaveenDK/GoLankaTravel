import express from 'express'
import { getGeocode, getNearbyPlaces } from '../controllers/maps.controller'
import { protect } from '../middleware/auth.middleware'

const router = express.Router()

// Apply protection to prevent abuse of your Google API Quota
router.use(protect)

/**
 * @route   GET /api/v1/maps/geocode
 * @desc    Convert address to Coordinates
 * @access  Private
 */
router.get('/geocode', getGeocode)

/**
 * @route   GET /api/v1/maps/nearby
 * @desc    Find hotels/attractions near a location
 * @access  Private
 */
router.get('/nearby', getNearbyPlaces)

export default router