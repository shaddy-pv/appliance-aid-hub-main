import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth, useNextAfterLogin } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const { login, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const next = useNextAfterLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const loading = authLoading;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate(next);
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err instanceof Error ? err.message : "Invalid email or password";
      setError(errorMessage);
    }
  };

  return (
    <div className="container py-10">
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">Sign in</h1>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <LoadingSpinner size="sm" text="Signing in..." /> : "Sign in"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-4">Don’t have an account? <Link className="underline" to="/register">Sign up</Link></p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;


