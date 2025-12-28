import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  inStock: boolean;
  bestseller: boolean;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true, unique: true, trim: true },
  brand: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number, min: 0 },
  rating: { type: Number, required: true, min: 0, max: 5, default: 0 },
  reviews: { type: Number, default: 0, min: 0 },
  imageUrl: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  bestseller: { type: Boolean, default: false },
}, {
  timestamps: true,
});

ProductSchema.index({ name: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ bestseller: -1, rating: -1 });

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
