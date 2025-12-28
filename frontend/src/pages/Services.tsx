import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Service } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Star, Clock, Wrench, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SkeletonGrid } from "@/components/SkeletonCard";
import { EmptyState } from "@/components/EmptyState";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addService } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.listServices();
        setServices(data);
      } catch (err) {
        setError('Failed to load services. Please try again.');
        console.error('Error loading services:', err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  if (loading) {
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Our Services</h1>
        <SkeletonGrid count={6} type="service" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Our Services</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Our Services</h1>
        <EmptyState
          icon={Wrench}
          title="No services available"
          description="We're currently updating our services. Please check back soon!"
          actionLabel="Go Home"
          actionHref="/"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional repair services for all your home appliances
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <Card key={s.id} className="group relative overflow-hidden border-2 border-gray-100 hover:border-primary/30 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardContent className="p-8 relative">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{s.description}</p>
                
                <div className="flex items-center justify-between mb-6 bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-gray-900">{s.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">{s.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-baseline justify-center mb-6 gap-2">
                  <span className="text-4xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    ₹{s.price}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">onwards</span>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    onClick={() => addService(s)} 
                    variant="outline"
                    className="flex-1 rounded-xl h-12 font-bold border-2"
                  >
                    <Wrench className="h-4 w-4 mr-2"/>
                    Add to Cart
                  </Button>
                  <Button 
                    onClick={() => navigate(`/book?serviceId=${s.id}`)} 
                    className="flex-1 rounded-xl h-12 font-bold shadow-lg hover:shadow-xl"
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;


