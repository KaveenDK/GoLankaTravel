import axios from 'axios'
import AppError from '../utils/appError'
import dotenv from 'dotenv'

dotenv.config()

// Ensure API Key exists
if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables')
}

const API_KEY = process.env.GEMINI_API_KEY
const MODEL_NAME = 'gemini-2.0-flash'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`

/**
 * Generates a travel itinerary using Google Gemini AI (via Axios)
 */
export const generateItinerary = async (
  destination: string,
  days: number,
  budget: string,
  interests: string[]
) => {
  try {
    // 1. Construct the Prompt
    const prompt = `
      Act as an expert travel guide for Sri Lanka.
      Create a detailed ${days}-day trip itinerary for ${destination}.
      Budget Level: ${budget}.
      User Interests: ${interests.join(', ')}.

      Please strictly return the response in the following JSON format only. 
      Do not add any markdown formatting like \`\`\`json or plain text explanations.
      
      {
        "tripTitle": "Catchy Title Here",
        "summary": "Brief summary of the experience",
        "days": [
          {
            "day": 1,
            "theme": "Theme of the day",
            "activities": [
              {
                "time": "09:00 AM",
                "activity": "Activity Name",
                "description": "Brief description",
                "location": "Location Name"
              }
            ]
          }
        ],
        "estimatedCost": "Cost range in LKR"
      }
    `

    // 2. Send Request via Axios
    const response = await axios.post(
      API_URL,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json"
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    // 3. Extract Text
    let text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      throw new Error('No data received from AI')
    }

    // 4. Clean and Parse
    text = text.replace(/```json/g, '').replace(/```/g, '').trim()
    const jsonResponse = JSON.parse(text)
    
    return jsonResponse

  } catch (error: any) {
    // Log the full error response from Google for debugging
    if (error.response) {
      console.error("AI API Error:", error.response.data)
      // Check for specific Google errors
      if (error.response.status === 429) {
         throw new AppError('AI Service is busy (Quota Exceeded). Please try again later.', 429)
      }
    } else {
      console.error("AI Network Error:", error.message)
    }
    throw new AppError('Failed to communicate with AI service', 503)
  }
}

/**
 * Chat with the AI Travel Assistant (via Axios)
 */
export const getAIChatResponse = async (
  message: string, 
  history: { role: 'user' | 'model', parts: string }[] = []
) => {
  try {
    // Format history for the REST API
    // The REST API expects "parts": [{"text": "..."}]
    const contents = history.map(h => ({
      role: h.role,
      parts: [{ text: h.parts }]
    }))

    // Add the new user message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    })

    const response = await axios.post(
      API_URL,
      { contents },
      { headers: { 'Content-Type': 'application/json' } }
    )

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text
    return text || "I couldn't generate a response."

  } catch (error: any) {
    console.error('AI Chat Error:', error.response?.data || error.message)
    throw new AppError('Failed to get AI chat response.', 503)
  }
}