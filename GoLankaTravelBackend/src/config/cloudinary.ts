import { v2 as cloudinary } from 'cloudinary'

const configureCloudinary = () => {
  // Check if keys exist to prevent crashing
  if (
    !process.env.CLOUDINARY_CLOUD_NAME || 
    !process.env.CLOUDINARY_API_KEY || 
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.error('❌ Cloudinary environment variables are missing!')
    // We don't exit process here so the server can still run without image uploads
    return
  }

  // Configure the Cloudinary SDK
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  console.log('✅ Cloudinary Configured Successfully')
}

export default configureCloudinary