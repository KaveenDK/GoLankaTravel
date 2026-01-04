import mongoose, { Schema, Document } from 'mongoose'
import { IUser } from './User.model'

/**
 * Interface for individual items in an order
 */
interface IOrderItem {
  tripId: mongoose.Schema.Types.ObjectId
  name: string
  quantity: number
  image: string
  price: number
}

/**
 * Interface for the Order Document
 */
export interface IOrder extends Document {
  user: mongoose.Types.ObjectId | IUser 
  orderItems: IOrderItem[]
  paymentInfo: {
    id: string
    status: string
  }
  paidAt: Date
  itemsPrice: number
  taxPrice: number
  shippingPrice: number
  totalPrice: number
  orderStatus: 'Processing' | 'Confirmed' | 'Delivered' | 'Cancelled'
  deliveredAt?: Date
  createdAt: Date
  updatedAt: Date
}

const OrderSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: [
      {
        tripId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Trip',
          required: true,
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    paymentInfo: {
      id: { type: String, required: true },
      status: { type: String, required: true },
    },
    paidAt: {
      type: Date,
      required: true,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    orderStatus: {
      type: String,
      required: true,
      default: 'Processing',
      enum: ['Processing', 'Confirmed', 'Delivered', 'Cancelled'],
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
)

export default mongoose.model<IOrder>('Order', OrderSchema)