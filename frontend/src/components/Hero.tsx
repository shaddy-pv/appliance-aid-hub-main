import { Search, Sparkles, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-appliance-service.jpg";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative min-h-[700px] flex items-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Professional appliance service technician" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      {/* Animated Gradient Orbs */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="container relative z-10 text-white py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <Badge className="bg-white/20 backdrop-blur-md border-white/30 text-white px-4 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              Trusted by 50,000+ Happy Customers
            </Badge>
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black leading-tight"
          >
            One-Stop Solution for
            <motion.span 
              className="block bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent mt-2"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Appliance Repair & Parts
            </motion.span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl opacity-95 max-w-3xl mx-auto font-medium"
          >
            Professional technicians, genuine parts, and doorstep service for all your home appliances
          </motion.p>
          
          {/* Search Bar - Glass Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
          >
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-primary transition-colors" />
              <Input 
                placeholder="Search for AC repair, washing machine parts..." 
                className="pl-12 h-16 text-lg bg-white/95 backdrop-blur-xl border-2 border-white/50 rounded-2xl shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 focus:border-white"
              />
            </div>
            <Button variant="action" size="xl" className="h-16 px-8 rounded-2xl shadow-2xl">
              <Zap className="h-5 w-5 mr-2" />
              Search
            </Button>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <a href="/book">
              <Button variant="glass" size="xl" className="rounded-2xl shadow-2xl min-w-[200px]">
                <Shield className="h-5 w-5 mr-2" />
                Book a Service
              </Button>
            </a>
            <a href="/products">
              <Button variant="outline" size="xl" className="border-2 border-white/50 text-white hover:bg-white hover:text-primary rounded-2xl backdrop-blur-sm min-w-[200px]">
                <Sparkles className="h-5 w-5 mr-2" />
                Shop Spare Parts
              </Button>
            </a>
          </motion.div>
          
          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-wrap justify-center gap-8 pt-8 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="opacity-90">Same Day Service</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="opacity-90">30-Day Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="opacity-90">Certified Technicians</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};