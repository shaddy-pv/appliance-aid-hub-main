import { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthUser {
  id: string;
  email: string;
  fullName: string;
}

export const useFirebaseAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
        console.log('Firebase auth state changed:', firebaseUser);
        if (firebaseUser) {
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            fullName: firebaseUser.displayName || 'User'
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }, (error) => {
        console.error('Firebase auth error:', error);
        setError('Firebase authentication error: ' + error.message);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Firebase auth setup error:', error);
      setError('Failed to initialize Firebase authentication');
      setLoading(false);
    }
  }, []);

  const register = async (email: string, fullName: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name
      await userCredential.user.updateProfile({
        displayName: fullName
      });
      
      return {
        id: userCredential.user.uid,
        email: userCredential.user.email || '',
        fullName: fullName
      };
    } catch (error: any) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      return {
        id: userCredential.user.uid,
        email: userCredential.user.email || '',
        fullName: userCredential.user.displayName || 'User'
      };
    } catch (error: any) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (error: any) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const getFirebaseErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please use a different email.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters long.';
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  return {
    user,
    loading,
    error,
    register,
    login,
    logout
  };
};
