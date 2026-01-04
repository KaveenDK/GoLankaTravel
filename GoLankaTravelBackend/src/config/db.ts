import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    // 1. Get the URI from environment variables
    const connString = process.env.MONGO_URI

    if (!connString) {
      console.error('❌ MongoDB URI is missing in .env file!')
      process.exit(1)
    }

    // 2. Attempt to connect
    const conn = await mongoose.connect(connString)

    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`)
  } catch (error: any) {
    // 3. Handle Connection Failures
    console.error(`❌ Error connecting to MongoDB: ${error.message}`)
    // Exit process with failure code 1
    process.exit(1)
  }
}

export default connectDB