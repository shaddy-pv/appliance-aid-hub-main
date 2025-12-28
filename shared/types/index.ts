// Shared types between frontend and backend

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  popular: boolean;
  imageUrl?: string;
}

export interface Product {
  id: string;
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

export interface Order {
  id: string;
  itemsJson: string;
  subtotal: number;
  paymentMethod: 'cod' | 'card' | 'upi';
  status: 'placed' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customerFullName: string;
  customerEmail: string;
  customerPhone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  status: 'requested' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  serviceId: string;
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
  createdAt: string;
}

export interface CartItem {
  type: 'product' | 'service';
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
}
