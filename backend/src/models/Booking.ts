import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IBooking extends Document {
  status: string;
  serviceId: Types.ObjectId;
  preferredDate: string;
  preferredTimeSlot: string;
  customerFullName: string;
  customerEmail: string;
  customerPhone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  notes?: string;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  status: { type: String, required: true, enum: ['requested', 'confirmed', 'in-progress', 'completed', 'cancelled'], default: 'requested' },
  serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  preferredDate: { type: String, required: true },
  preferredTimeSlot: { type: String, required: true },
  customerFullName: { type: String, required: true, trim: true },
  customerEmail: { type: String, required: true, lowercase: true, trim: true },
  customerPhone: { type: String, required: true, trim: true },
  addressLine1: { type: String, required: true, trim: true },
  addressLine2: { type: String, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  postalCode: { type: String, required: true, trim: true },
  notes: { type: String, trim: true },
}, {
  timestamps: true,
});

BookingSchema.index({ customerEmail: 1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ serviceId: 1 });
BookingSchema.index({ createdAt: -1 });

export const Booking = mongoose.model<IBooking>('Booking', BookingSchema);
