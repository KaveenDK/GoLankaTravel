import mongoose, { Schema, Document } from 'mongoose'

/**
 * Interface for the Trip Document
 */
export interface ITrip extends Document {
  name: string
  destination: string
  description: string
  price: number
  currency: string
  duration: number
  category: string
  image: string
  startDate?: Date
  endDate?: Date
  itinerary: Array<{
    day: number
    theme: string
    activities: Array<{
      time: string
      activity: string
      description?: string
      location?: string
    }>
  }>
  generatedByAI: boolean
  ratingsAverage: number
  ratingsQuantity: number
}

const TripSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A trip must have a name'],
      trim: true,
      unique: true,
    },
    destination: {
      type: String,
      required: [true, 'A trip must have a destination'],
    },
    description: {
      type: String,
      required: [true, 'A trip must have a description'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'A trip must have a price'],
    },
    currency: {
      type: String,
      default: 'LKR',
    },
    duration: {
      type: Number,
      required: [true, 'A trip must have a duration'],
    },
    category: {
      type: String,
      required: [true, 'A trip must have a category'],
    },
    image: {
      type: String,
      required: [true, 'A trip must have a cover image'],
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    itinerary: [
      {
        day: { type: Number },
        theme: { type: String },
        activities: [
          {
            time: { type: String },
            activity: { type: String },
            description: { type: String },
            location: { type: String },
          },
        ],
      },
    ],
    generatedByAI: {
      type: Boolean,
      default: false,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val: number) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

TripSchema.index({ price: 1, ratingsAverage: -1 })
TripSchema.index({ destination: 1 })

export default mongoose.model<ITrip>('Trip', TripSchema)