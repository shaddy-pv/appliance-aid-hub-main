import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Wrench, User, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
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
    <header className="bg-card border-b sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-bold text-lg">Appliance Aid Hub</Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={({isActive}) => isActive ? "text-primary font-medium" : "text-foreground/80 hover:text-foreground"}>Home</NavLink>
          <NavLink to="/services" className={({isActive}) => isActive ? "text-primary font-medium" : "text-foreground/80 hover:text-foreground"}>Services</NavLink>
          <NavLink to="/products" className={({isActive}) => isActive ? "text-primary font-medium" : "text-foreground/80 hover:text-foreground"}>Products</NavLink>
          <NavLink to="/book" className={({isActive}) => isActive ? "text-primary font-medium" : "text-foreground/80 hover:text-foreground"}>Book Service</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
            <Link to="/book"><Wrench className="h-4 w-4 mr-2"/>Book</Link>
          </Button>
          <Button asChild variant="secondary" size="sm">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-4 w-4"/>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full px-1.5 py-0.5">
                  {count}
                </span>
              )}
            </Link>
          </Button>
          <div className="hidden md:block text-sm text-muted-foreground">₹{subtotal.toLocaleString()}</div>
          
          {/* Auth Section */}
          {loading ? (
            <div className="w-20 h-8 bg-muted animate-pulse rounded"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.fullName}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.fullName}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/cart" className="w-full">My Cart</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/book" className="w-full">Book Service</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild size="sm">
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