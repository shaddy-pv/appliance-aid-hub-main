import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const FirebaseTest = () => {
  const { user, login, register, logout, loading, error } = useAuth();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('Test User');

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert('Login successful!');
    } catch (err) {
      alert('Login failed: ' + (err as Error).message);
    }
  };

  const handleRegister = async () => {
    try {
      await register(email, fullName, password);
      alert('Registration successful!');
    } catch (err) {
      alert('Registration failed: ' + (err as Error).message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      alert('Logout successful!');
    } catch (err) {
      alert('Logout failed: ' + (err as Error).message);
    }
  };

  return (
    <div className="container py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Firebase Authentication Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {user ? (
            <div>
              <p className="text-green-600">✅ Logged in as: {user.email}</p>
              <p className="text-sm text-gray-600">Name: {user.fullName}</p>
              <p className="text-sm text-gray-600">ID: {user.id}</p>
              <Button onClick={handleLogout} className="w-full mt-4">
                Logout
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <Input 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <Input 
                  type="password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleRegister} disabled={loading} className="flex-1">
                  {loading ? 'Loading...' : 'Register'}
                </Button>
                <Button onClick={handleLogin} disabled={loading} className="flex-1">
                  {loading ? 'Loading...' : 'Login'}
                </Button>
              </div>
            </div>
          )}
          {error && (
            <div className="text-red-600 text-sm">
              Error: {error}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FirebaseTest;
