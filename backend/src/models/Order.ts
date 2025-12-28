import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  itemsJson: string;
  subtotal: number;
  paymentMethod: string;
  status: string;
  customerFullName: string;
  customerEmail: string;
  customerPhone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
  itemsJson: { type: String, required: true },
  subtotal: { type: Number, required: true, min: 0 },
  paymentMethod: { type: String, required: true, enum: ['cod', 'card', 'upi'] },
  status: { type: String, required: true, enum: ['placed', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'placed' },
  customerFullName: { type: String, required: true, trim: true },
  customerEmail: { type: String, required: true, lowercase: true, trim: true },
  customerPhone: { type: String, required: true, trim: true },
  addressLine1: { type: String, required: true, trim: true },
  addressLine2: { type: String, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  postalCode: { type: String, required: true, trim: true },
}, {
  timestamps: true,
});

OrderSchema.index({ customerEmail: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
