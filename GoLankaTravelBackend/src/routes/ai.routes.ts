import express from 'express'
import { generateTripPlan, chatWithAI } from '../controllers/ai.controller'
import { protect } from '../middleware/auth.middleware'
import { aiLimiter } from '../middleware/rateLimit.middleware'

const router = express.Router()


router.use(protect)

/**
 * @route   POST /api/v1/ai/generate
 * @desc    Generate a full trip itinerary based on prompt
 * @access  Private
 */
router.post('/generate', generateTripPlan)

/**
 * @route   POST /api/v1/ai/chat
 * @desc    Chat with the AI Travel Assistant
 * @access  Private
 */
router.post('/chat', chatWithAI)

/**
 * @route   POST /api/v1/ai/generate-itinerary
 * @desc    Generate a detailed trip itinerary (Rate Limited)
 * @access  Private
 */
router.post('/generate-itinerary', aiLimiter, generateTripPlan)

export default router