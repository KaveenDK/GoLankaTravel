import dotenv from 'dotenv'
dotenv.config()

import app from './app'
import connectDB from './config/db'
import configureCloudinary from './config/cloudinary'

const PORT = process.env.PORT || 5000

// 1. Connect to MongoDB Database
connectDB()
configureCloudinary()

// 2. Start the Server
const server = app.listen(PORT, () => {
  console.log(`✅ Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
})

// 3. Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err: any) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  
  // Close server and exit process
  server.close(() => {
    process.exit(1)
  })
})

// 4. Handle Uncaught Exceptions
process.on('uncaughtException', (err: any) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})