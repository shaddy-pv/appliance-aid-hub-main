import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { items, subtotal, updateQuantity, removeLine, clear } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-muted-foreground">Your cart is empty.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="p-4">Item</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Qty</th>
                    <th className="p-4">Total</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(i => (
                    <tr key={i.id} className="border-b">
                      <td className="p-4 font-medium">{"name" in i ? i.name : i.title}</td>
                      <td className="p-4 capitalize">{i.type}</td>
                      <td className="p-4">₹{i.price.toLocaleString()}</td>
                      <td className="p-4">
                        <input type="number" min={1} value={i.quantity} onChange={(e) => updateQuantity(i.id, Number(e.target.value))} className="w-16 h-9 border rounded-md px-2" />
                      </td>
                      <td className="p-4">₹{(i.price * i.quantity).toLocaleString()}</td>
                      <td className="p-4 text-right"><Button variant="ghost" onClick={() => removeLine(i.id)}>Remove</Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
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


