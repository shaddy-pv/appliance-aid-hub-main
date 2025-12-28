import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth as useCustomAuth, useNextAfterLogin } from '@/hooks/useAuth';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  register: (email: string, name: string, password: string) => Promise<AuthUser>;
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

export { useNextAfterLogin };

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const customAuth = useCustomAuth();

  return (
    <AuthContext.Provider value={customAuth}>
      {children}
    </AuthContext.Provider>
  );
};
