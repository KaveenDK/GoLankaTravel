declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Server Configuration
      PORT: string
      NODE_ENV: 'development' | 'production'
      FRONTEND_URL: string

      // Database
      MONGO_URI: string

      // JWT Authentication
      JWT_SECRET: string
      JWT_EXPIRES_IN: string
      REFRESH_TOKEN_SECRET: string
      REFRESH_TOKEN_EXPIRES_IN: string

      // Google OAuth
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string

      // Cloudinary (Image Uploads)
      CLOUDINARY_CLOUD_NAME: string
      CLOUDINARY_API_KEY: string
      CLOUDINARY_API_SECRET: string

      // Google Maps
      GOOGLE_MAPS_API_KEY: string

      // Email Service (Nodemailer)
      EMAIL_USER: string
      EMAIL_PASS: string

      // AI Service
      GEMINI_API_KEY: string

      // Payment Gateways
      STRIPE_SECRET_KEY: string
      STRIPE_WEBHOOK_SECRET: string 
      PAYHERE_MERCHANT_ID: string
      PAYHERE_SECRET: string
    }
  }
}

export {}