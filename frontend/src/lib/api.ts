import { readFromStorage, writeToStorage } from "@/lib/storage";
import type { Booking, CartItem, CustomerInfo, Order, Product, Service, UniqueId } from "@/lib/types";

const KEYS = {
  services: "services",
  products: "products",
  cart: "cart",
  orders: "orders",
  bookings: "bookings",
} as const;

function generateId(prefix: string = "id"): UniqueId {
  return `${prefix}_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

function inrToNumber(value: string): number {
  // expects values like "₹499" or "2,499" or "2499"
  const digits = value.replace(/[^0-9.]/g, "");
  return Number(digits);
}

function seedServices(): Service[] {
  const existing = readFromStorage<Service[]>(KEYS.services, []);
  if (existing.length) return existing;
  const initial: Service[] = [
    { id: generateId("svc"), title: "AC Service & Repair", description: "Complete AC maintenance, gas refilling, and repair services", price: 499, duration: "1-2 hours", rating: 4.8, popular: true },
    { id: generateId("svc"), title: "Washing Machine Repair", description: "Expert repair for all brands of washing machines", price: 399, duration: "45 mins", rating: 4.7 },
    { id: generateId("svc"), title: "Microwave Repair", description: "Quick microwave repair and maintenance services", price: 299, duration: "30 mins", rating: 4.6 },
    { id: generateId("svc"), title: "Electrical Repair", description: "Safe and reliable electrical repair services", price: 199, duration: "1 hour", rating: 4.9 },
  ];
  writeToStorage(KEYS.services, initial);
  return initial;
}

function seedProducts(): Product[] {
  const existing = readFromStorage<Product[]>(KEYS.products, []);
  if (existing.length) return existing;
  const initial: Product[] = [
    { id: generateId("prd"), name: "AC Gas R32 (1kg)", brand: "Genuine Parts", price: inrToNumber("₹2,499"), originalPrice: inrToNumber("₹2,999"), rating: 4.8, reviews: 156, imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop", inStock: true, bestseller: true },
    { id: generateId("prd"), name: "Washing Machine Belt", brand: "Universal", price: inrToNumber("₹299"), originalPrice: inrToNumber("₹399"), rating: 4.6, reviews: 89, imageUrl: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=300&h=300&fit=crop", inStock: true },
    { id: generateId("prd"), name: "Microwave Magnetron", brand: "OEM Quality", price: inrToNumber("₹1,899"), originalPrice: inrToNumber("₹2,299"), rating: 4.7, reviews: 67, imageUrl: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=300&h=300&fit=crop", inStock: false },
    { id: generateId("prd"), name: "AC Remote Control", brand: "Compatible", price: inrToNumber("₹599"), originalPrice: inrToNumber("₹799"), rating: 4.5, reviews: 234, imageUrl: "https://images.unsplash.com/photo-1615486364173-ae0e2b8b8ba9?w=300&h=300&fit=crop", inStock: true },
  ];
  writeToStorage(KEYS.products, initial);
  return initial;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || ""; // Use environment variable or fallback to proxy

// Enhanced fetch with retry logic and better error handling
async function apiRequest(url: string, options: RequestInit = {}): Promise<Response> {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      lastError = error as Error;
      console.warn(`API request attempt ${attempt} failed:`, error);
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }

  throw lastError || new Error('API request failed');
}

export const api = {
  // Services
  async listServices(): Promise<Service[]> {
    try {
      const res = await apiRequest(`${API_BASE}/api/services`);
      return res.json();
    } catch (error) {
      console.warn('Failed to fetch services from API, using local data:', error);
      // fallback to local seed if backend not available
      return seedServices();
    }
  },

  async getService(id: UniqueId): Promise<Service | undefined> {
    try {
      const services = await this.listServices();
      return services.find(s => s.id === id);
    } catch {
      const services = seedServices();
      return services.find(s => s.id === id);
    }
  },

  // Products
  async listProducts(): Promise<Product[]> {
    try {
      const res = await apiRequest(`${API_BASE}/api/products`);
      return res.json();
    } catch (error) {
      console.warn('Failed to fetch products from API, using local data:', error);
      return seedProducts();
    }
  },

  async getProduct(id: UniqueId): Promise<Product | undefined> {
    try {
      const products = await this.listProducts();
      return products.find(p => p.id === id);
    } catch {
      const products = seedProducts();
      return products.find(p => p.id === id);
    }
  },

  // Cart
  readCart(): CartItem[] {
    return readFromStorage<CartItem[]>(KEYS.cart, []);
  },

  writeCart(items: CartItem[]): void {
    writeToStorage(KEYS.cart, items);
  },

  addProductToCart(product: Product, quantity: number = 1): CartItem[] {
    const items = this.readCart();
    const existing = items.find(i => i.type === "product" && (i as any).productId === product.id) as CartItem | undefined;
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({
        id: generateId("line"),
        type: "product",
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity,
      } as CartItem);
    }
    this.writeCart(items);
    return items;
  },

  addServiceToCart(service: Service, quantity: number = 1): CartItem[] {
    const items = this.readCart();
    const existing = items.find(i => i.type === "service" && (i as any).serviceId === service.id) as CartItem | undefined;
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.push({
        id: generateId("line"),
        type: "service",
        serviceId: service.id,
        title: service.title,
        price: service.price,
        quantity,
      } as CartItem);
    }
    this.writeCart(items);
    return items;
  },

  updateQuantity(lineId: UniqueId, quantity: number): CartItem[] {
    const items = this.readCart().map(i => i.id === lineId ? { ...i, quantity } : i).filter(i => i.quantity > 0);
    this.writeCart(items);
    return items;
  },

  removeLine(lineId: UniqueId): CartItem[] {
    const items = this.readCart().filter(i => i.id !== lineId);
    this.writeCart(items);
    return items;
  },

  clearCart(): void {
    this.writeCart([]);
  },

  // Orders
  async placeOrder(customer: CustomerInfo, paymentMethod: Order["paymentMethod"]): Promise<Order> {
    const items = this.readCart();
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    try {
      const res = await apiRequest(`${API_BASE}/api/orders`, {
        method: "POST",
        body: JSON.stringify({ items, subtotal, customer, paymentMethod }),
      });
      const order = await res.json();
      this.clearCart();
      return order;
    } catch (error) {
      console.warn('Failed to place order via API, using local storage:', error);
      const order: Order = {
        id: generateId("ord"),
        createdAt: new Date().toISOString(),
        items,
        subtotal,
        customer,
        paymentMethod,
        status: "placed",
      };
      const orders = readFromStorage<Order[]>(KEYS.orders, []);
      orders.unshift(order);
      writeToStorage(KEYS.orders, orders);
      this.clearCart();
      return order;
    }
  },

  listOrders(): Order[] {
    return readFromStorage<Order[]>(KEYS.orders, []);
  },

  // Bookings
  async createBooking(input: Omit<Booking, "id" | "createdAt" | "status"> & { status?: Booking["status"] }): Promise<Booking> {
    try {
      const res = await apiRequest(`${API_BASE}/api/bookings`, {
        method: "POST",
        body: JSON.stringify(input),
      });
      return res.json();
    } catch (error) {
      console.warn('Failed to create booking via API, using local storage:', error);
      const booking: Booking = {
        id: generateId("bkg"),
        createdAt: new Date().toISOString(),
        status: input.status ?? "requested",
        serviceId: input.serviceId,
        preferredDate: input.preferredDate,
        preferredTimeSlot: input.preferredTimeSlot,
        customer: input.customer,
        notes: input.notes,
      };
      const bookings = readFromStorage<Booking[]>(KEYS.bookings, []);
      bookings.unshift(booking);
      writeToStorage(KEYS.bookings, bookings);
      return booking;
    }
  },

  listBookings(): Booking[] {
    return readFromStorage<Booking[]>(KEYS.bookings, []);
  },
};


