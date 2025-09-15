export type UniqueId = string;

export interface Service {
  id: UniqueId;
  title: string;
  description: string;
  price: number; // smallest currency unit optional, but we use number in INR
  duration: string; // e.g., "1-2 hours"
  rating: number;
  popular?: boolean;
  imageUrl?: string;
}

export interface Product {
  id: UniqueId;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  inStock: boolean;
  bestseller?: boolean;
}

export type CartItemType = "product" | "service";

export interface CartItemBase {
  id: UniqueId; // line-item id
  type: CartItemType;
  quantity: number;
}

export interface ProductCartItem extends CartItemBase {
  type: "product";
  productId: UniqueId;
  name: string;
  price: number;
  imageUrl?: string;
}

export interface ServiceCartItem extends CartItemBase {
  type: "service";
  serviceId: UniqueId;
  title: string;
  price: number;
}

export type CartItem = ProductCartItem | ServiceCartItem;

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

export interface Order {
  id: UniqueId;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  customer: CustomerInfo;
  paymentMethod: "cod" | "card" | "upi";
  status: "placed" | "processing" | "completed" | "cancelled";
}

export interface Booking {
  id: UniqueId;
  createdAt: string;
  serviceId: UniqueId;
  preferredDate: string; // ISO date
  preferredTimeSlot: string; // e.g., "10:00-12:00"
  customer: CustomerInfo;
  notes?: string;
  status: "requested" | "scheduled" | "completed" | "cancelled";
}


