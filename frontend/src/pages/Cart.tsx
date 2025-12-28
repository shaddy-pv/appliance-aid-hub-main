import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "@/components/EmptyState";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";

const CartPage = () => {
  const { items, subtotal, updateQuantity, removeLine, clear } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <EmptyState
          icon={ShoppingCart}
          title="Your cart is empty"
          description="Start adding services or products to your cart to get started with your order."
          actionLabel="Browse Services"
          actionHref="/services"
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items.map(i => (
              <Card key={i.id}>
                <CardContent className="p-4 md:p-6">
                  <div className="flex gap-4">
                    {i.imageUrl && (
                      <img 
                        src={i.imageUrl} 
                        alt={"name" in i ? i.name : i.title}
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-base md:text-lg truncate">
                            {"name" in i ? i.name : i.title}
                          </h3>
                          <p className="text-sm text-muted-foreground capitalize">{i.type}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeLine(i.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2 border rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(i.id, Math.max(1, i.quantity - 1))}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center font-medium">{i.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(i.id, i.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">₹{i.price.toLocaleString()} each</p>
                          <p className="text-lg font-bold text-primary">₹{(i.price * i.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
              </div>
              <Button className="w-full" onClick={() => navigate("/checkout")}>Proceed to Checkout</Button>
              <Button variant="outline" className="w-full" onClick={clear}>Clear Cart</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CartPage;


