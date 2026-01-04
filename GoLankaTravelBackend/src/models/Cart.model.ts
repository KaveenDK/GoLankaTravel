import mongoose, { Schema, Document } from 'mongoose'

/**
 * Interface for individual items inside the cart
 */
export interface ICartItem {
  tripId: string   // Reference to the Trip ID
  name: string     // Trip Name (snapshot)
  price: number    // Unit Price (snapshot)
  quantity: number // Number of people/packages
  image: string    // Thumbnail URL
}

/**
 * Interface for the Cart Document
 */
export interface ICart extends Document {
  userId: string
  items: ICartItem[]
  totalPrice: number
}

const CartSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    items: [
      {
        tripId: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1, min: 1 },
        image: { type: String }
      }
    ],
    totalPrice: {
      type: Number,
      default: 0,
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.model<ICart>('Cart', CartSchema)