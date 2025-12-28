import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Product } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { LoadingCard } from "@/components/LoadingSpinner";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addProduct } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.listProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        <LoadingCard text="Loading products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        <div className="text-center py-8">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Spare Parts
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Genuine, high-quality spare parts for all major appliance brands
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <Card key={p.id} className="group relative overflow-hidden border-2 border-gray-100 hover:border-primary/30 rounded-3xl transition-all duration-500 hover:shadow-2xl bg-white">
              <div className="relative overflow-hidden">
                <img 
                  src={p.imageUrl} 
                  alt={p.name} 
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                {p.bestseller && (
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg font-bold">
                    ⭐ Bestseller
                  </Badge>
                )}
                {!p.inStock && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <Badge className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-4 py-2 text-sm font-bold shadow-xl">
                      Out of Stock
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardContent className="p-5">
                <div className="mb-3">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">{p.brand}</span>
                  <h3 className="font-bold text-lg truncate text-gray-900 group-hover:text-primary transition-colors">
                    {p.name}
                  </h3>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-gray-900">{p.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({p.reviews} reviews)
                  </span>
                </div>
                
                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-2xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    ₹{p.price.toLocaleString()}
                  </span>
                  {p.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{p.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                
                <Button 
                  className="w-full rounded-xl h-11 font-bold shadow-lg hover:shadow-xl group-hover:scale-105 transition-all" 
                  disabled={!p.inStock} 
                  onClick={() => addProduct(p)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {p.inStock ? "Add to Cart" : "Notify Me"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;


