import mongoose, { Schema, Document } from 'mongoose'

/**
 * Interface for Payment Document
 */
export interface IPayment extends Document {
  user: mongoose.Schema.Types.ObjectId
  order: mongoose.Schema.Types.ObjectId
  paymentMethod: 'Stripe' | 'PayHere' | 'Cash'
  transactionId: string
  amount: number
  currency: string
  status: 'Pending' | 'Completed' | 'Failed' | 'Refunded'
  gatewayResponse?: any
}

const PaymentSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['Stripe', 'PayHere', 'Cash'],
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'LKR',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
      default: 'Pending',
    },
    gatewayResponse: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
)

export default mongoose.model<IPayment>('Payment', PaymentSchema)