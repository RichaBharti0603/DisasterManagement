
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>; 
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already authenticated from localStorage
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    
    setIsAuthenticated(authStatus);
    setIsAdmin(adminStatus);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // For MVP, we'll use hardcoded credentials
    // In a real app, this would be an API call to backend
    if (email === 'user@example.com' && password === 'password') {
      setIsAuthenticated(true);
      setIsAdmin(false);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('isAdmin', 'false');
      return true;
    } else if (email === 'admin@example.com' && password === 'admin') {
      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // For MVP, we'll simulate a successful signup
    // In a real app, this would be an API call to backend
    setIsAuthenticated(true);
    setIsAdmin(false);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isAdmin', 'false');
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
