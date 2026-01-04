import mongoose, { Schema, Document } from 'mongoose'

/**
 * Interface for Category Document
 */
export interface ICategory extends Document {
  name: string
  description?: string
  image?: string
}

const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    image: {
      type: String,
      default: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg' // Default placeholder if none provided
    }
  },
  { timestamps: true }
)

export default mongoose.model<ICategory>('Category', CategorySchema)