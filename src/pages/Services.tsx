import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Service } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Star, Clock, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LoadingCard } from "@/components/LoadingSpinner";

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
        <h1 className="text-3xl font-bold mb-6">Services</h1>
        <LoadingCard text="Loading services..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Services</h1>
        <div className="text-center py-8">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <Card key={s.id} className="service-card">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-muted-foreground mb-4">{s.description}</p>
              <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{s.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{s.duration}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-primary">₹{s.price}</span>
                <span className="text-sm text-muted-foreground">onwards</span>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => addService(s)} className="flex-1"><Wrench className="h-4 w-4 mr-2"/>Add to Cart</Button>
                <Button variant="outline" onClick={() => navigate(`/book?serviceId=${s.id}`)} className="flex-1">Book Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;


