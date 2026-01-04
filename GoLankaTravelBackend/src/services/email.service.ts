import { transporter } from '../config/mailer'
import AppError from '../utils/appError'

/**
 * Send a generic email
 * @param to - Recipient email address
 * @param subject - Email subject line
 * @param html - HTML body content
 */
export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const mailOptions = {
      from: `"GoLanka Travel" <${process.env.EMAIL_USER}>`, 
      to,
      subject,
      html,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Email sent: %s', info.messageId)
    return info
  } catch (error: any) {
    console.error('❌ Error sending email:', error.message)
    throw new AppError('Email could not be sent', 500)
  }
}

/**
 * Send Verification OTP (Registration)
 */
export const sendVerificationEmail = async (to: string, otp: string) => {
  const subject = 'Verify Your Account - GoLanka Travel 🇱🇰'
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #ffffff;">
      <h2 style="color: #4a148c; text-align: center;">Verify Your Email Address</h2>
      <p style="color: #333; font-size: 16px; text-align: center;">
        Thank you for joining <strong>GoLanka Travel</strong>! Please use the code below to complete your registration.
      </p>
      
      <div style="background-color: #f3e5f5; padding: 10px; border-radius: 8px; text-align: center; margin: 20px 0;">
        <h1 style="color: #4a148c; letter-spacing: 5px; font-size: 32px; margin: 0;">${otp}</h1>
      </div>

      <p style="color: #666; font-size: 14px; text-align: center;">This code is valid for 10 minutes.</p>
      <p style="color: #999; font-size: 12px; text-align: center; margin-top: 20px;">If you didn't request this, you can safely ignore this email.</p>
    </div>
  `
  await sendEmail(to, subject, html)
}

/**
 * Send Welcome Email to New Users
 */
export const sendWelcomeEmail = async (to: string, username: string) => {
  const subject = 'Welcome to GoLanka Travel! 🌴';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #4a148c; text-align: center;">Welcome, ${username}!</h2>
      <p style="font-size: 16px; color: #333;">We are thrilled to have you on board. Get ready to explore the beauty of Sri Lanka like never before.</p>
      
      <p style="font-size: 16px; color: #333;">Start planning your dream trip with our <strong>AI-Powered Smart Planner</strong> today.</p>
      
      <div style="text-align: center; margin-top: 20px;">
        <a href="${process.env.FRONTEND_URL}/planner" style="display: inline-block; padding: 12px 24px; background-color: #7c3aed; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Plan My Trip</a>
      </div>

      <p style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">The GoLanka Team</p>
    </div>
  `;
  await sendEmail(to, subject, html)
}

/**
 * Send OTP for Password Reset
 */
export const sendOtpEmail = async (to: string, otp: string) => {
  const subject = 'Your Password Reset OTP'
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
      <h3 style="color: #333;">Password Reset Request</h3>
      <p>Use the code below to verify your identity. This code is valid for 10 minutes.</p>
      
      <h1 style="color: #d32f2f; letter-spacing: 5px; font-size: 32px; margin: 20px 0;">${otp}</h1>
      
      <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
    </div>
  `;
  await sendEmail(to, subject, html)
}

/**
 * Send Booking Confirmation
 */
export const sendBookingConfirmation = async (to: string, tripName: string, amount: number) => {
    const subject = 'Booking Confirmed! ✅'
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #2e7d32;">Booking Successful!</h2>
        <p>Your trip to <strong>${tripName}</strong> has been confirmed.</p>
        
        <div style="background: #f1f8e9; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="margin: 0;">Total Paid: <strong style="font-size: 18px;">LKR ${amount.toLocaleString()}</strong></p>
        </div>

        <p>You can view your full itinerary and download the PDF report from your dashboard.</p>
        <a href="${process.env.FRONTEND_URL}/dashboard" style="color: #7c3aed; font-weight: bold;">Go to My Dashboard</a>
      </div>
    `;
    await sendEmail(to, subject, html)
  }