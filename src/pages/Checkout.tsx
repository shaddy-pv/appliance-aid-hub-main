import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { api } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth, useLoginRedirect } from "@/hooks/useAuth";

const formSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  addressLine1: z.string().min(5),
  addressLine2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().min(4),
  paymentMethod: z.enum(["cod", "card", "upi"]).default("cod"),
});

type FormValues = z.infer<typeof formSchema>;

const CheckoutPage = () => {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const goLogin = useLoginRedirect();

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { paymentMethod: "cod" }
  });

  const onSubmit = async (values: FormValues) => {
    if (!user) { goLogin("/checkout"); return; }
    if (items.length === 0) return;
    const order = await api.placeOrder({
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      city: values.city,
      state: values.state,
      postalCode: values.postalCode,
    }, values.paymentMethod);
    toast({ title: "Order placed", description: `Order ${order.id} placed successfully.` });
    reset();
    clear();
    navigate("/");
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="fullName">Full Name</label>
                  <Input id="fullName" {...register("fullName")} />
                  {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="phone">Phone</label>
                  <Input id="phone" {...register("phone")} />
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                  <Input id="email" {...register("email")} />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="postalCode">Postal Code</label>
                  <Input id="postalCode" {...register("postalCode")} />
                  {errors.postalCode && <p className="text-destructive text-sm mt-1">{errors.postalCode.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="addressLine1">Address</label>
                <Input id="addressLine1" {...register("addressLine1")} />
                {errors.addressLine1 && <p className="text-destructive text-sm mt-1">{errors.addressLine1.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="addressLine2">Address 2</label>
                <Input id="addressLine2" {...register("addressLine2")} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="city">City</label>
                  <Input id="city" {...register("city")} />
                  {errors.city && <p className="text-destructive text-sm mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="state">State</label>
                  <Input id="state" {...register("state")} />
                  {errors.state && <p className="text-destructive text-sm mt-1">{errors.state.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="paymentMethod">Payment Method</label>
                <select id="paymentMethod" className="w-full h-10 border rounded-md px-3" {...register("paymentMethod")}>
                  <option value="cod">Cash on Delivery</option>
                  <option value="upi">UPI</option>
                  <option value="card">Card</option>
                </select>
              </div>
              <Button type="submit" disabled={isSubmitting || items.length === 0}>Place Order</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Items</span>
              <span>{items.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;


