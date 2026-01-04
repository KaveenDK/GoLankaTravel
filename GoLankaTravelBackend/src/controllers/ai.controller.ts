import { Request, Response, NextFunction } from 'express'
import { generateItinerary, getAIChatResponse } from '../services/ai.service'
import AppError from '../utils/appError'
import { sendResponse } from '../utils/apiResponse'

/**
 * @desc    Generate AI Itinerary
 * @route   POST /api/v1/ai/generate
 * @access  Private (User)
 */
export const generateTripPlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { destination, days, budget, interests } = req.body

    // 1. Basic Validation
    if (!destination || !days || !budget) {
      return next(new AppError('Please provide destination, days, and budget level.', 400))
    }

    // 2. Call AI Service (Heavy logic is in the service)
    const aiResponse = await generateItinerary(destination, days, budget, interests)

    // 3. Send Response
    sendResponse(res, 200, true, 'Itinerary generated successfully', {
      destination,
      days,
      budget,
      itinerary: aiResponse
    })

  } catch (error: any) {
    next(new AppError('AI Generation Failed: ' + error.message, 500))
  }
}

/**
 * @desc    Chat with AI Travel Assistant
 * @route   POST /api/v1/ai/chat
 * @access  Private (User)
 */
export const chatWithAI = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, history } = req.body

    if (!message) {
      return next(new AppError('Message is required', 400))
    }

    // Call the AI Service
    const aiReply = await getAIChatResponse(message, history)

    sendResponse(res, 200, true, 'AI Reply fetched', {
      reply: aiReply
    })

  } catch (error: any) {
    next(new AppError('AI Chat Failed: ' + error.message, 500))
  }
}