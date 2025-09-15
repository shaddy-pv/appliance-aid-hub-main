import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart } from "lucide-react";

// Featured products are shown statically on home, dynamic list at /products

const products = [
  {
    id: "fp1",
    name: "AC Gas R32 (1kg)",
    brand: "Genuine Parts",
    price: "₹2,499",
    originalPrice: "₹2,999",
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    inStock: true,
    bestseller: true,
  },
  {
    id: "fp2",
    name: "Washing Machine Belt",
    brand: "Universal",
    price: "₹299",
    originalPrice: "₹399",
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop",
    inStock: true,
    bestseller: false,
  },
  {
    id: "fp3",
    name: "Microwave Magnetron",
    brand: "OEM Quality",
    price: "₹1,899",
    originalPrice: "₹2,299",
    rating: 4.7,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&h=400&fit=crop",
    inStock: false,
    bestseller: false,
  },
  {
    id: "fp4",
    name: "AC Remote Control",
    brand: "Compatible",
    price: "₹599",
    originalPrice: "₹799",
    rating: 4.5,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1615486364173-ae0e2b8b8ba9?w=600&h=400&fit=crop",
    inStock: true,
    bestseller: false,
  },
];

export const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Top Selling Spare Parts
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Genuine, high-quality spare parts for all major appliance brands
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="service-card group overflow-hidden">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.bestseller && (
                  <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">
                    Bestseller
                  </Badge>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-md font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground">{product.brand}</span>
                  <h3 className="font-semibold truncate">{product.name}</h3>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-primary">
                    {product.price}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                </div>
                
                <a href="/products">
                  <Button 
                    variant={product.inStock ? "default" : "secondary"} 
                    className="w-full"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inStock ? "Add to Cart" : "Notify Me"}
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="/products">
            <Button variant="outline" size="lg">
              Shop All Parts
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};