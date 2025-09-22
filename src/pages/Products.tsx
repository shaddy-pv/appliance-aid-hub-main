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
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <Card key={p.id} className="service-card group overflow-hidden">
            <div className="relative">
              <img src={p.imageUrl} alt={p.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              {p.bestseller && (
                <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">Bestseller</Badge>
              )}
              {!p.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-md font-medium">Out of Stock</span>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="mb-2">
                <span className="text-sm text-muted-foreground">{p.brand}</span>
                <h3 className="font-semibold truncate">{p.name}</h3>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{p.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({p.reviews})</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold text-primary">₹{p.price.toLocaleString()}</span>
                {p.originalPrice && <span className="text-sm text-muted-foreground line-through">₹{p.originalPrice.toLocaleString()}</span>}
              </div>
              <Button className="w-full" disabled={!p.inStock} onClick={() => addProduct(p)}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                {p.inStock ? "Add to Cart" : "Notify Me"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;


