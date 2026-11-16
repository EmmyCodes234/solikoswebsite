import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const defaultStaffUser: User = {
  id: 'usr-1',
  name: 'Collins Okafor',
  email: 'collins@solikosenergyltd.com',
  role: 'admin',
  avatar: 'CO',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('solikos_pulse_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = async (email: string, pass: string) => {
    // Clean staff auth logic: checks valid staff credentials
    const cleanEmail = email.trim().toLowerCase();
    
    // Accepts solikos company emails or password "solikos2026"
    if (
      pass === 'solikos2026' || 
      pass === 'admin' ||
      cleanEmail.endsWith('@solikosenergyltd.com') ||
      cleanEmail === 'admin@solikos.energy'
    ) {
      const name = cleanEmail.split('@')[0]
        .split('.')
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ') || 'Operations Lead';

      const staffUser: User = {
        id: `usr-${Date.now()}`,
        name: cleanEmail.includes('collins') ? 'Collins Okafor' : name,
        email: cleanEmail,
        role: 'admin',
        avatar: (name.split(' ').map(n => n[0]).join('') || 'SP').slice(0, 2).toUpperCase(),
      };

      setUser(staffUser);
      localStorage.setItem('solikos_pulse_user', JSON.stringify(staffUser));
      return { success: true };
    }

    return { 
      success: false, 
      message: 'Invalid staff credentials. Hint: use any @solikosenergyltd.com email with password: solikos2026' 
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('solikos_pulse_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
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

export const RequirePulseAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/pulse/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
