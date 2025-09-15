import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-appliance-service.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center bg-gradient-to-br from-primary via-primary-glow to-primary overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Professional appliance service technician" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      
      <div className="container relative z-10 text-white">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            One-stop Solution for 
            <span className="block text-secondary-glow">Appliance Repair & Spare Parts</span>
          </h1>
          
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Professional technicians, genuine parts, and doorstep service for all your home appliances
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search services or parts..." 
                className="pl-10 h-14 text-lg bg-white/95 backdrop-blur-sm border-0"
              />
            </div>
            <Button variant="action" size="xl" className="h-14">
              Search
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/book"><Button variant="hero" size="xl">Book a Service</Button></a>
            <a href="/products"><Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-primary">Shop Spare Parts</Button></a>
          </div>
        </div>
      </div>
    </section>
  );
};