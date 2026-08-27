import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, Role } from '../types';
import { authApi } from '../api/auth.api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: Role | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('tw_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem('tw_token'));
  const [loading, setLoading] = useState<boolean>(true);

  // Validate stored session on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('tw_token');
      if (storedToken) {
        try {
          const currentUser = await authApi.getMe();
          setUser(currentUser);
          localStorage.setItem('tw_user', JSON.stringify(currentUser));
        } catch {
          // Token is invalid or expired
          setUser(null);
          setToken(null);
          localStorage.removeItem('tw_token');
          localStorage.removeItem('tw_user');
        }
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const res = await authApi.login({ username, password });
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('tw_token', res.token);
      localStorage.setItem('tw_user', JSON.stringify(res.user));
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    setLoading(true);
    try {
      const res = await authApi.signup({ email, password, name });
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('tw_token', res.token);
      localStorage.setItem('tw_user', JSON.stringify(res.user));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('tw_token');
    localStorage.removeItem('tw_user');
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updatedData };
      setUser(updated);
      localStorage.setItem('tw_user', JSON.stringify(updated));
    }
  };

  const value: AuthContextType = {
    user,
    token,
    role: user?.role || null,
    isAuthenticated: !!user && !!token,
    loading,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
