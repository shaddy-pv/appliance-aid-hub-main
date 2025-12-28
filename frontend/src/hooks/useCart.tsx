import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import type { CartItem, Product, Service } from "@/lib/types";

interface CartContextValue {
  items: CartItem[];
  subtotal: number;
  addProduct: (product: Product, qty?: number) => void;
  addService: (service: Service, qty?: number) => void;
  updateQuantity: (lineId: string, qty: number) => void;
  removeLine: (lineId: string) => void;
  clear: () => void;
  refresh: () => void;
}

const CartContext = React.createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = React.useState<CartItem[]>(() => api.readCart());
  const { user } = useAuth();
  const navigate = useNavigate();
  const goLogin = (path: string) => navigate(`/login?next=${encodeURIComponent(path)}`);

  const subtotal = React.useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items]);

  const refresh = React.useCallback(() => setItems(api.readCart()), []);

  const addProduct = React.useCallback((product: Product, qty: number = 1) => {
    if (!user) { goLogin("/products"); return; }
    setItems(api.addProductToCart(product, qty));
  }, [user, goLogin]);

  const addService = React.useCallback((service: Service, qty: number = 1) => {
    if (!user) { goLogin("/services"); return; }
    setItems(api.addServiceToCart(service, qty));
  }, [user, goLogin]);

  const updateQuantity = React.useCallback((lineId: string, qty: number) => {
    setItems(api.updateQuantity(lineId, qty));
  }, []);

  const removeLine = React.useCallback((lineId: string) => {
    setItems(api.removeLine(lineId));
  }, []);

  const clear = React.useCallback(() => {
    api.clearCart();
    setItems([]);
  }, []);

  const value = React.useMemo(() => ({ items, subtotal, addProduct, addService, updateQuantity, removeLine, clear, refresh }), [items, subtotal, addProduct, addService, updateQuantity, removeLine, clear, refresh]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextValue {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}


