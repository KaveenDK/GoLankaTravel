import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

// Check if credentials exist to warn the developer early
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn("⚠️  EMAIL_USER or EMAIL_PASS missing in .env. Emails will not send.")
}

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
})

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email Service Error:", error.message)
  } else {
    console.log("✅ Email Service is Ready to send messages")
  }
})