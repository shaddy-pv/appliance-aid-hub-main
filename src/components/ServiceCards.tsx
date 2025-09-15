import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Wrench, Zap } from "lucide-react";
import acIcon from "@/assets/ac-service-icon.jpg";
import washingMachineIcon from "@/assets/washing-machine-icon.jpg";
import microwaveIcon from "@/assets/microwave-icon.jpg";
import electricalIcon from "@/assets/electrical-icon.jpg";

// Home page preview list (Services page shows dynamic list)
const services = [
  {
    id: 1,
    title: "AC Service & Repair",
    description: "Complete AC maintenance, gas refilling, and repair services",
    icon: acIcon,
    price: "₹499",
    duration: "1-2 hours",
    rating: 4.8,
    popular: true,
  },
  {
    id: 2,
    title: "Washing Machine Repair",
    description: "Expert repair for all brands of washing machines",
    icon: washingMachineIcon,
    price: "₹399",
    duration: "45 mins",
    rating: 4.7,
    popular: false,
  },
  {
    id: 3,
    title: "Microwave Repair",
    description: "Quick microwave repair and maintenance services",
    icon: microwaveIcon,
    price: "₹299",
    duration: "30 mins",
    rating: 4.6,
    popular: false,
  },
  {
    id: 4,
    title: "Electrical Repair",
    description: "Safe and reliable electrical repair services",
    icon: electricalIcon,
    price: "₹199",
    duration: "1 hour",
    rating: 4.9,
    popular: false,
  },
];

export const ServiceCards = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Quick Service Booking
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Book trusted professionals for your appliance repair needs with instant pricing
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="service-card group">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <img 
                    src={service.icon} 
                    alt={service.title}
                    className="w-16 h-16 mx-auto rounded-lg object-cover"
                  />
                  {service.popular && (
                    <Badge className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground">
                      Popular
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-center">
                  {service.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{service.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary">{service.price}</span>
                  <span className="text-sm text-muted-foreground">onwards</span>
                </div>
                
                <a href={`/book?serviceId=${service.id}`}>
                  <Button 
                    variant="service" 
                    className="w-full"
                  >
                    <Wrench className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="/services">
            <Button variant="outline" size="lg">
              <Zap className="h-4 w-4 mr-2" />
              View All Services
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};