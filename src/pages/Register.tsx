import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth, useNextAfterLogin } from "@/hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const { register: signup } = useAuth();
  const navigate = useNavigate();
  const next = useNextAfterLogin();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signup(fullName, email, password);
      navigate(next);
    } catch (err) {
      setError("Failed to sign up. Try a different email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-10">
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-4">Create account</h1>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full name</label>
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Sign up"}</Button>
          </form>
          <p className="text-sm text-muted-foreground mt-4">Already have an account? <Link className="underline" to="/login">Sign in</Link></p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;


