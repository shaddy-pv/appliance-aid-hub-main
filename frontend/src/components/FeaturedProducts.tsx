import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, Package, Percent } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

// Featured products are shown statically on home, dynamic list at /products

const products = [
  {
    id: "fp1",
    name: "AC Gas R32 (1kg)",
    brand: "Genuine Parts",
    price: "₹2,499",
    originalPrice: "₹2,999",
    discount: 17,
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
    discount: 25,
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
    discount: 17,
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
    discount: 25,
    rating: 4.5,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1615486364173-ae0e2b8b8ba9?w=600&h=400&fit=crop",
    inStock: true,
    bestseller: false,
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

export const FeaturedProducts = () => {
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  const toggleLike = (productId: string) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-orange-500/10 text-orange-600 border-orange-500/20 px-4 py-2">
            <Package className="h-4 w-4 mr-2" />
            Genuine Parts
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Top Selling Spare Parts
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Genuine, high-quality spare parts for all major appliance brands
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item}>
              <Card className="group relative overflow-hidden border-2 border-gray-100 hover:border-primary/30 rounded-3xl transition-all duration-500 hover:shadow-2xl bg-white">
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.bestseller && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg font-bold">
                        ⭐ Bestseller
                      </Badge>
                    )}
                    {product.discount && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg font-bold">
                        <Percent className="h-3 w-3 mr-1" />
                        {product.discount}% OFF
                      </Badge>
                    )}
                  </div>
                  
                  {/* Out of Stock Overlay */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <Badge className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-4 py-2 text-sm font-bold shadow-xl">
                        Out of Stock
                      </Badge>
                    </div>
                  )}
                  
                  {/* Wishlist Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleLike(product.id)}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg flex items-center justify-center transition-all"
                  >
                    <Heart 
                      className={`h-5 w-5 transition-all ${
                        likedProducts.has(product.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </motion.button>
                </div>
                
                <CardContent className="p-5">
                  {/* Brand & Name */}
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">{product.brand}</span>
                    <h3 className="font-bold text-lg truncate text-gray-900 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-2xl font-black bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      {product.price}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {product.originalPrice}
                    </span>
                  </div>
                  
                  {/* CTA Button */}
                  <a href="/products">
                    <Button 
                      variant={product.inStock ? "default" : "outline"} 
                      className="w-full rounded-xl h-11 font-bold shadow-lg hover:shadow-xl group-hover:scale-105 transition-all"
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? "Add to Cart" : "Notify Me"}
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
          <a href="/products">
            <Button variant="outline" size="lg" className="rounded-xl border-2 hover:scale-105 transition-transform">
              <Package className="h-5 w-5 mr-2" />
              Shop All Parts
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};