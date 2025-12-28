import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Wrench, Zap, TrendingUp, Award } from "lucide-react";
import acIcon from "@/assets/ac-service-icon.jpg";
import washingMachineIcon from "@/assets/washing-machine-icon.jpg";
import microwaveIcon from "@/assets/microwave-icon.jpg";
import electricalIcon from "@/assets/electrical-icon.jpg";
import { motion } from "framer-motion";

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
    gradient: "from-blue-500 to-cyan-500",
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
    gradient: "from-purple-500 to-pink-500",
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
    gradient: "from-orange-500 to-red-500",
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
    gradient: "from-green-500 to-emerald-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const ServiceCards = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <Award className="h-4 w-4 mr-2" />
            Premium Services
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Quick Service Booking
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Book trusted professionals for your appliance repair needs with instant pricing
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={service.id} variants={item}>
              <Card className="group relative overflow-hidden border-2 border-gray-100 hover:border-primary/30 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <CardContent className="p-6 relative">
                  {/* Icon with Gradient Border */}
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${service.gradient} p-1 group-hover:scale-110 transition-transform duration-500`}>
                      <img 
                        src={service.icon} 
                        alt={service.title}
                        className="w-full h-full rounded-xl object-cover"
                      />
                    </div>
                    {service.popular && (
                      <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 shadow-lg animate-pulse">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-center group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-6 text-center leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between mb-6 text-sm bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-900">{service.rating}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">{service.duration}</span>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-baseline justify-center mb-6 gap-2">
                    <span className="text-3xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      {service.price}
                    </span>
                    <span className="text-sm text-muted-foreground font-medium">onwards</span>
                  </div>
                  
                  {/* CTA Button */}
                  <a href={`/book?serviceId=${service.id}`}>
                    <Button 
                      variant="default" 
                      className="w-full rounded-xl h-12 font-bold shadow-lg hover:shadow-xl group-hover:scale-105 transition-all"
                    >
                      <Wrench className="h-4 w-4 mr-2" />
                      Book Now
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a href="/services">
            <Button variant="outline" size="lg" className="rounded-xl border-2 hover:scale-105 transition-transform">
              <Zap className="h-5 w-5 mr-2" />
              View All Services
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};