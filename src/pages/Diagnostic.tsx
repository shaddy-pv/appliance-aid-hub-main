import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Diagnostic = () => {
  const { user, loading, error } = useAuth();
  const [firebaseStatus, setFirebaseStatus] = useState<string>('Checking...');
  const [authStatus, setAuthStatus] = useState<string>('Checking...');

  useEffect(() => {
    // Check Firebase connection
    try {
      if (auth) {
        setFirebaseStatus('✅ Firebase Auth initialized');
      } else {
        setFirebaseStatus('❌ Firebase Auth not initialized');
      }
    } catch (err) {
      setFirebaseStatus(`❌ Firebase Error: ${err}`);
    }

    // Check auth state
    if (loading) {
      setAuthStatus('⏳ Loading...');
    } else if (error) {
      setAuthStatus(`❌ Auth Error: ${error}`);
    } else if (user) {
      setAuthStatus(`✅ User logged in: ${user.email}`);
    } else {
      setAuthStatus('ℹ️ No user logged in');
    }
  }, [user, loading, error]);

  return (
    <div className="container py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Firebase Authentication Diagnostic</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Firebase Status:</h3>
            <p className="text-sm">{firebaseStatus}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Auth Context Status:</h3>
            <p className="text-sm">{authStatus}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">User Data:</h3>
            <pre className="text-xs bg-gray-100 p-2 rounded">
              {JSON.stringify({ user, loading, error }, null, 2)}
            </pre>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.open('https://console.firebase.google.com/', '_blank')}
            >
              Open Firebase Console
            </Button>
          </div>

          <div className="text-sm text-gray-600">
            <p><strong>Next steps:</strong></p>
            <ol className="list-decimal list-inside space-y-1 mt-2">
              <li>Go to Firebase Console</li>
              <li>Click "Authentication" → "Get started"</li>
              <li>Enable "Email/Password" sign-in method</li>
              <li>Save and refresh this page</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Diagnostic;
