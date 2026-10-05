import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    getStorageItem('ruveron_admin_auth', false)
  );
  const [user, setUser] = useState<User | null>(() =>
    getStorageItem('ruveron_admin_user', null)
  );

  useEffect(() => {
    setStorageItem('ruveron_admin_auth', isAuthenticated);
    setStorageItem('ruveron_admin_user', user);
  }, [isAuthenticated, user]);

  const login = (email: string, pass: string): boolean => {
    // Basic frontend verification for demo mode
    if (email && pass && pass.length >= 4) {
      setIsAuthenticated(true);
      setUser({
        email,
        name: 'Ruveron Administrator',
        role: 'Super Admin',
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('ruveron_admin_auth');
    localStorage.removeItem('ruveron_admin_user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
