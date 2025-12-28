import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Wrench, User, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import { MobileNav } from "@/components/MobileNav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const { items, subtotal } = useCart();
  const { user, logout, loading } = useAuth();
  const count = items.reduce((n, i) => n + i.quantity, 0);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="container flex items-center justify-between h-18 py-3">
        <div className="flex items-center gap-4">
          <MobileNav />
          <Link to="/" className="font-black text-xl md:text-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
            Appliance Aid Hub
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              isActive 
                ? "text-primary font-bold relative after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-primary" 
                : "text-foreground/70 hover:text-foreground font-semibold transition-colors"
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/services" 
            className={({isActive}) => 
              isActive 
                ? "text-primary font-bold relative after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-primary" 
                : "text-foreground/70 hover:text-foreground font-semibold transition-colors"
            }
          >
            Services
          </NavLink>
          <NavLink 
            to="/products" 
            className={({isActive}) => 
              isActive 
                ? "text-primary font-bold relative after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-primary" 
                : "text-foreground/70 hover:text-foreground font-semibold transition-colors"
            }
          >
            Products
          </NavLink>
          <NavLink 
            to="/book" 
            className={({isActive}) => 
              isActive 
                ? "text-primary font-bold relative after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-primary" 
                : "text-foreground/70 hover:text-foreground font-semibold transition-colors"
            }
          >
            Book Service
          </NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm" className="hidden md:inline-flex rounded-xl">
            <Link to="/book"><Wrench className="h-4 w-4 mr-2"/>Book</Link>
          </Button>
          <Button asChild variant="secondary" size="sm" className="relative rounded-xl">
            <Link to="/cart">
              <ShoppingCart className="h-4 w-4"/>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-lg animate-pulse">
                  {count}
                </span>
              )}
            </Link>
          </Button>
          <div className="hidden md:block text-sm font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg">
            ₹{subtotal.toLocaleString()}
          </div>
          
          {/* Auth Section */}
          {loading ? (
            <div className="w-20 h-9 bg-muted animate-pulse rounded-xl"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 rounded-xl hover:bg-primary/10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline font-semibold">{user.name}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl">
                <div className="px-3 py-2">
                  <p className="text-sm font-bold">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  {user.role === 'admin' && (
                    <Badge variant="secondary" className="text-xs mt-1">Admin</Badge>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/cart" className="w-full cursor-pointer">My Cart</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/book" className="w-full cursor-pointer">Book Service</Link>
                </DropdownMenuItem>
                {user.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="w-full cursor-pointer">Admin Panel</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="rounded-xl">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="rounded-xl">
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;