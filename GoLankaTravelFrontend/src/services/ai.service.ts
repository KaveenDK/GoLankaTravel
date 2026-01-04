import api from './api'
import type { PlannerFormData } from '../components/ai/PlannerForm'

// --- Types for AI Responses ---

export interface Activity {
  time: string
  activity: string
  description?: string
}

export interface DayPlan {
  day: number
  theme: string
  activities: Activity[]
}

export interface AIPlannerResponse {
  success: boolean
  data: {
    itinerary: DayPlan[] 
    destination: string
    budget: string
  }
}

export interface ChatRequest {
  message: string
  history?: { role: 'user' | 'assistant'; content: string }[]
}

export interface ChatResponse {
  success: boolean
  data: {
    reply: string
  }
}

// --- Service Methods ---

const aiService = {
  /**
   * Sends user preferences to the backend to generate a trip itinerary.
   * Endpoint: POST /api/v1/ai/generate
   */
  generateTripPlan: async (formData: PlannerFormData): Promise<DayPlan[]> => {
    try {
      const payload = {
        destination: formData.destination,
        days: formData.duration,
        budget: formData.budget,
        interests: formData.interests,
      }

      const response = await api.post<AIPlannerResponse>('/ai/generate', payload)
      
      return response.data.data.itinerary
    } catch (error) {
      console.error('AI Service Error (Generate Plan):', error)
      throw new Error('Failed to generate itinerary. Please try again.')
    }
  },

  /**
   * Sends a chat message to the AI assistant.
   * Endpoint: POST /api/v1/ai/chat
   */
  getChatResponse: async (message: string, history: ChatRequest['history'] = []): Promise<string> => {
    try {
      const response = await api.post<ChatResponse>('/ai/chat', { 
        message, 
        history 
      })
      return response.data.data.reply
    } catch (error) {
      console.error('AI Service Error (Chat):', error)
      return "I'm having trouble connecting to the server right now. Please try again later."
    }
  }
}

export default aiService