import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  popular: boolean;
  imageUrl?: string;
}

const ServiceSchema = new Schema<IService>({
  title: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  duration: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5, default: 0 },
  popular: { type: Boolean, default: false },
  imageUrl: { type: String },
}, {
  timestamps: true,
});

ServiceSchema.index({ title: 1 });
ServiceSchema.index({ popular: -1, rating: -1 });

export const Service = mongoose.model<IService>('Service', ServiceSchema);
