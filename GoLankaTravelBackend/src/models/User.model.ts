import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  username: string
  email: string
  password?: string
  role: 'admin' | 'traveler'
  googleId?: string
  avatar?: string
  preferences?: {
    theme: 'light' | 'dark'
    currency: string
  }
  // New Fields for Auth
  isVerified: boolean
  otp?: string
  otpExpires?: Date
  
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Please tell us your name!'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return !this.googleId
      },
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ['traveler', 'admin'],
      default: 'traveler',
    },
    googleId: { type: String },
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    },
    preferences: {
      theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'dark',
      },
      currency: {
        type: String,
        default: 'LKR',
      },
    },
    // --- Auth Verification Fields ---
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      select: false, 
    },
    otpExpires: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre('save', async function () {
  // 1. If password is not modified, simply return to exit the function
  if (!this.isModified('password')) return

  // 2. Hash the password with cost of 12
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12)
  }
})

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as any as IUser
  return await bcrypt.compare(candidatePassword, user.password || '')
}

export default mongoose.model<IUser>('User', UserSchema)