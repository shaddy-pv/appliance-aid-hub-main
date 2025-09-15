import { Hero } from "@/components/Hero";
import { ServiceCards } from "@/components/ServiceCards";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <Hero />
      <ServiceCards />
      <FeaturedProducts />
      <WhyChooseUs />
      
      {/* Call to Action Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Fix Your Appliances?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Get instant quotes, book certified technicians, and shop genuine parts - all in one place
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="xl" onClick={() => navigate('/book')}>
              Book Service Now
            </Button>
            <a href="tel:+919876543210">
              <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-primary">
                Call +91 98765 43210
              </Button>
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-card border-t">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Appliance Aid Hub</h3>
              <p className="text-muted-foreground mb-4">
                Your trusted partner for all appliance repair and spare parts needs. 
                Professional service at your doorstep.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>AC Service & Repair</li>
                <li>Washing Machine Repair</li>
                <li>Microwave Repair</li>
                <li>Electrical Repair</li>
                <li>Refrigerator Service</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>support@applianceaidhub.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Available across all metro cities</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground text-sm">
            <p>&copy; 2024 Appliance Aid Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;