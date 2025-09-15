import { Shield, Award, Wrench, Clock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Certified Technicians",
    description: "All our technicians are trained and certified professionals with years of experience"
  },
  {
    icon: Award,
    title: "30-Day Warranty",
    description: "Complete warranty on all repairs and services for your peace of mind"
  },
  {
    icon: Wrench,
    title: "Genuine Parts",
    description: "We use only genuine, high-quality spare parts for all repairs"
  },
  {
    icon: Clock,
    title: "Quick Service",
    description: "Same-day service available with real-time tracking of technicians"
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-accent/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Appliance Aid Hub?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the best appliance repair experience with trusted professionals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};