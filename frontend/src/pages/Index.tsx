import { Hero } from "@/components/Hero";
import { ServiceCards } from "@/components/ServiceCards";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
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
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="container text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Fix Your Appliances?
          </h2>
          <p className="text-xl md:text-2xl opacity-95 mb-10 max-w-3xl mx-auto font-medium">
            Get instant quotes, book certified technicians, and shop genuine parts - all in one place
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              variant="glass" 
              size="xl" 
              onClick={() => navigate('/book')}
              className="rounded-2xl shadow-2xl min-w-[220px]"
            >
              Book Service Now
            </Button>
            <a href="tel:+919876543210">
              <Button 
                variant="outline" 
                size="xl" 
                className="border-2 border-white/50 text-white hover:bg-white hover:text-primary rounded-2xl backdrop-blur-sm min-w-[220px]"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call +91 98765 43210
              </Button>
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-black mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Appliance Aid Hub
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
                Your trusted partner for all appliance repair and spare parts needs. 
                Professional service at your doorstep with certified technicians.
              </p>
              <div className="flex items-center gap-3 bg-gray-800 rounded-xl p-4 w-fit">
                <Phone className="h-5 w-5 text-primary" />
                <span className="font-bold text-white text-lg">+91 98765 43210</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4 text-lg">Services</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">AC Service & Repair</li>
                <li className="hover:text-white transition-colors cursor-pointer">Washing Machine Repair</li>
                <li className="hover:text-white transition-colors cursor-pointer">Microwave Repair</li>
                <li className="hover:text-white transition-colors cursor-pointer">Electrical Repair</li>
                <li className="hover:text-white transition-colors cursor-pointer">Refrigerator Service</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4 text-lg">Contact Info</h4>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <span className="hover:text-white transition-colors">support@applianceaidhub.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <span>Available across all metro cities</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500">&copy; 2024 Appliance Aid Hub. All rights reserved.</p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link to="/refund-policy" className="text-gray-400 hover:text-white transition-colors">
                  Refund Policy
                </Link>
                <Link to="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;