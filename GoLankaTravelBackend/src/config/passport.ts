import passport from 'passport'
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20'
import User from '../models/User.model'
import dotenv from 'dotenv'

dotenv.config()

// 1. Configure the Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: '/api/v1/auth/google/callback',
      scope: ['profile', 'email']
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
      try {
        // A. Check if user already exists in DB with this Google ID
        let existingUser = await User.findOne({ googleId: profile.id })

        if (existingUser) {
          return done(null, existingUser)
        }

        // B. If no user with Google ID, check if email already exists
        // (This handles cases where user signed up manually first)
        const email = profile.emails?.[0].value
        if (email) {
          existingUser = await User.findOne({ email })
          
          if (existingUser) {
            // Update the existing user with Google ID so next time they can login directly
            existingUser.googleId = profile.id
            if (!existingUser.avatar) existingUser.avatar = profile.photos?.[0].value
            // Ensure verified is true since they proved ownership via Google
            existingUser.isVerified = true
            await existingUser.save()
            return done(null, existingUser)
          }
        }

        // C. If completely new, create a new user
        const newUser = await User.create({
          username: profile.displayName,
          email: email,
          googleId: profile.id,
          avatar: profile.photos?.[0].value,
          role: 'traveler', // Default role
          isVerified: true, // Trusted provider, so we mark as verified
          // Password is not required because of the conditional requirement in User model
        })

        return done(null, newUser)

      } catch (error: any) {
        return done(error, undefined)
      }
    }
  )
)

// Serialization usually not needed for stateless JWT, but good to have to prevent passport errors
passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err, null)
  }
})

export default passport