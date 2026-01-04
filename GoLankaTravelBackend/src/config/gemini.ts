import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'

dotenv.config()

// 1. Initialize the Google Generative AI Client
const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
  console.error("❌ GEMINI_API_KEY is missing in .env file. AI features will not work.")
}

const genAI = new GoogleGenerativeAI(apiKey || '')

export const getGeminiModel = () => {
  return genAI.getGenerativeModel({ model: "gemini-pro" })
}

export default genAI