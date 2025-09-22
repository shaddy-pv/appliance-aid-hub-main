import React, { createContext, useContext, ReactNode } from 'react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';

interface AuthUser {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  register: (email: string, fullName: string, password: string) => Promise<AuthUser>;
  login: (email: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useNextAfterLogin = () => {
  // Get the 'next' parameter from URL or default to home
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('next') || '/';
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const firebaseAuth = useFirebaseAuth();

  const value: AuthContextType = {
    user: firebaseAuth.user,
    loading: firebaseAuth.loading,
    error: firebaseAuth.error,
    register: firebaseAuth.register,
    login: firebaseAuth.login,
    logout: firebaseAuth.logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
