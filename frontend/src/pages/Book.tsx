import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
  const { toast } = useToast();

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
    const service = services.find(s => s.id === values.serviceId);
    if (!service) {
      toast({ 
        title: "Error", 
        description: "Please select a service",
        variant: "destructive" 
      });
      return;
    }

    // Format the message for WhatsApp
    const addressLine2Part = values.addressLine2 ? `${values.addressLine2}, ` : '';
    const notesSection = values.notes ? `\nAdditional Notes:\n${values.notes}` : '';
    
    const message = `NEW SERVICE BOOKING REQUEST

Service Details:
Service: ${service.title}
Date: ${values.preferredDate}
Time Slot: ${values.preferredTimeSlot}

Customer Details:
Name: ${values.fullName}
Phone: ${values.phone}
Email: ${values.email}

Address:
${values.addressLine1}, ${addressLine2Part}${values.city}, ${values.state} - ${values.postalCode}${notesSection}`;

    // WhatsApp number (without + or spaces)
    const whatsappNumber = "919598353650";
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    toast({ 
      title: "Redirecting to WhatsApp", 
      description: "Complete your booking by sending the message on WhatsApp" 
    });
    
    // Optional: Reset form after a delay
    setTimeout(() => {
      reset();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Book a Service
          </h1>
          <p className="text-xl text-muted-foreground">
            Fill in your details and we'll get back to you shortly
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 border-2 border-gray-100 rounded-3xl shadow-xl">
            <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="serviceId" className="text-sm font-bold text-gray-700">Service</Label>
                <select id="serviceId" className="w-full h-12 border-2 rounded-xl px-4 mt-2 focus:border-primary focus:outline-none transition-colors" {...register("serviceId")}>
                  <option value="">Select a service</option>
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.title} — ₹{s.price}</option>
                  ))}
                </select>
                {errors.serviceId && <p className="text-destructive text-sm mt-2 font-medium">{errors.serviceId.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="preferredDate" className="text-sm font-bold text-gray-700">Preferred Date</Label>
                  <Input type="date" id="preferredDate" {...register("preferredDate")} className="h-12 rounded-xl border-2 mt-2" />
                  {errors.preferredDate && <p className="text-destructive text-sm mt-2 font-medium">{errors.preferredDate.message}</p>}
                </div>
                <div>
                  <Label htmlFor="preferredTimeSlot" className="text-sm font-bold text-gray-700">Time Slot</Label>
                  <select id="preferredTimeSlot" className="w-full h-12 border-2 rounded-xl px-4 mt-2 focus:border-primary focus:outline-none transition-colors" {...register("preferredTimeSlot")}>
                    {[
                      "08:00-10:00",
                      "10:00-12:00",
                      "12:00-14:00",
                      "14:00-16:00",
                      "16:00-18:00",
                    ].map(slot => <option key={slot} value={slot}>{slot}</option>)}
                  </select>
                  {errors.preferredTimeSlot && <p className="text-destructive text-sm mt-2 font-medium">{errors.preferredTimeSlot.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-bold text-gray-700">Full Name</Label>
                  <Input id="fullName" placeholder="Your name" {...register("fullName")} className="h-12 rounded-xl border-2 mt-2" />
                  {errors.fullName && <p className="text-destructive text-sm mt-2 font-medium">{errors.fullName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-bold text-gray-700">Phone</Label>
                  <Input id="phone" placeholder="Phone number" {...register("phone")} className="h-12 rounded-xl border-2 mt-2" />
                  {errors.phone && <p className="text-destructive text-sm mt-2 font-medium">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-sm font-bold text-gray-700">Email</Label>
                  <Input id="email" placeholder="Email" {...register("email")} className="h-12 rounded-xl border-2 mt-2" />
                  {errors.email && <p className="text-destructive text-sm mt-2 font-medium">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="postalCode" className="text-sm font-bold text-gray-700">Postal Code</Label>
                  <Input id="postalCode" placeholder="Postal Code" {...register("postalCode")} className="h-12 rounded-xl border-2 mt-2" />
                  {errors.postalCode && <p className="text-destructive text-sm mt-2 font-medium">{errors.postalCode.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="addressLine1" className="text-sm font-bold text-gray-700">Address Line 1</Label>
                <Input id="addressLine1" placeholder="Address line 1" {...register("addressLine1")} className="h-12 rounded-xl border-2 mt-2" />
                {errors.addressLine1 && <p className="text-destructive text-sm mt-2 font-medium">{errors.addressLine1.message}</p>}
              </div>
              <div>
                <Label htmlFor="addressLine2" className="text-sm font-bold text-gray-700">Address Line 2 (Optional)</Label>
                <Input id="addressLine2" placeholder="Address line 2" {...register("addressLine2")} className="h-12 rounded-xl border-2 mt-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="city" className="text-sm font-bold text-gray-700">City</Label>
                  <Input id="city" placeholder="City" {...register("city")} className="h-12 rounded-xl border-2 mt-2" />
                  {errors.city && <p className="text-destructive text-sm mt-2 font-medium">{errors.city.message}</p>}
                </div>
                <div>
                  <Label htmlFor="state" className="text-sm font-bold text-gray-700">State</Label>
                  <Input id="state" placeholder="State" {...register("state")} className="h-12 rounded-xl border-2 mt-2" />
                  {errors.state && <p className="text-destructive text-sm mt-2 font-medium">{errors.state.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="text-sm font-bold text-gray-700">Additional Notes (Optional)</Label>
                <Input id="notes" placeholder="Any additional details" {...register("notes")} className="h-12 rounded-xl border-2 mt-2" />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full h-14 rounded-xl font-bold text-base shadow-lg hover:shadow-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Book via WhatsApp
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-gray-100 rounded-3xl shadow-xl bg-gradient-to-br from-primary/5 to-purple-50">
          <CardContent className="p-8">
            <h2 className="text-2xl font-black mb-6 text-gray-900">What happens next?</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                <p className="text-gray-700 leading-relaxed">Fill the form with your details and preferred date/time.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                <p className="text-gray-700 leading-relaxed">Click "Book via WhatsApp" to send your request directly to us.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                <p className="text-gray-700 leading-relaxed">We'll confirm your booking and assign a certified technician.</p>
              </li>
            </ul>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default BookPage;


