import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import type { Service } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  fullName: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number"),
  addressLine1: z.string().min(5, "Enter address"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "Enter city"),
  state: z.string().min(2, "Enter state"),
  postalCode: z.string().min(4, "Enter postal code"),
  preferredDate: z.string().min(1, "Select date"),
  preferredTimeSlot: z.string().min(1, "Select time"),
  notes: z.string().optional(),
  serviceId: z.string().min(1, "Select a service"),
});

type FormValues = z.infer<typeof formSchema>;

const BookPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const goLogin = (path: string) => navigate(`/login?next=${encodeURIComponent(path)}`);

  useEffect(() => {
    api.listServices().then(setServices);
  }, []);

  const defaultServiceId = params.get("serviceId") ?? "";

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceId: defaultServiceId,
      preferredTimeSlot: "10:00-12:00",
    }
  });

  const onSubmit = async (values: FormValues) => {
    if (!user) { goLogin("/book"); return; }
    const service = services.find(s => s.id === values.serviceId);
    if (!service) return;
    api.createBooking({
      serviceId: service.id,
      preferredDate: values.preferredDate,
      preferredTimeSlot: values.preferredTimeSlot,
      customer: {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        city: values.city,
        state: values.state,
        postalCode: values.postalCode,
      },
      notes: values.notes,
    });
    toast({ title: "Booking requested", description: "We will contact you shortly to confirm." });
    reset();
    navigate("/services");
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Book a Service</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="serviceId">Service</Label>
                <select id="serviceId" className="w-full h-10 border rounded-md px-3" {...register("serviceId")}>
                  <option value="">Select a service</option>
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.title} — ₹{s.price}</option>
                  ))}
                </select>
                {errors.serviceId && <p className="text-destructive text-sm mt-1">{errors.serviceId.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preferredDate">Preferred Date</Label>
                  <Input type="date" id="preferredDate" {...register("preferredDate")} />
                  {errors.preferredDate && <p className="text-destructive text-sm mt-1">{errors.preferredDate.message}</p>}
                </div>
                <div>
                  <Label htmlFor="preferredTimeSlot">Time Slot</Label>
                  <select id="preferredTimeSlot" className="w-full h-10 border rounded-md px-3" {...register("preferredTimeSlot")}>
                    {[
                      "08:00-10:00",
                      "10:00-12:00",
                      "12:00-14:00",
                      "14:00-16:00",
                      "16:00-18:00",
                    ].map(slot => <option key={slot} value={slot}>{slot}</option>)}
                  </select>
                  {errors.preferredTimeSlot && <p className="text-destructive text-sm mt-1">{errors.preferredTimeSlot.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Your name" {...register("fullName")} />
                  {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Phone number" {...register("phone")} />
                  {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Email" {...register("email")} />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input id="postalCode" placeholder="Postal Code" {...register("postalCode")} />
                  {errors.postalCode && <p className="text-destructive text-sm mt-1">{errors.postalCode.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="addressLine1">Address</Label>
                <Input id="addressLine1" placeholder="Address line 1" {...register("addressLine1")} />
                {errors.addressLine1 && <p className="text-destructive text-sm mt-1">{errors.addressLine1.message}</p>}
              </div>
              <div>
                <Label htmlFor="addressLine2">Address 2</Label>
                <Input id="addressLine2" placeholder="Address line 2" {...register("addressLine2")} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" {...register("city")} />
                  {errors.city && <p className="text-destructive text-sm mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="State" {...register("state")} />
                  {errors.state && <p className="text-destructive text-sm mt-1">{errors.state.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input id="notes" placeholder="Any additional details" {...register("notes")} />
              </div>

              <Button type="submit" disabled={isSubmitting}>Submit Booking</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="font-semibold mb-4">What happens next?</h2>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
              <li>We'll review your request and assign a certified technician.</li>
              <li>You'll receive a call to confirm details and time slot.</li>
              <li>Pay securely after service completion.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookPage;


