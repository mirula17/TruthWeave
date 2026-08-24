import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
  is_active: boolean;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  fetchProfile: (authToken: string) => Promise<User>;
}

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthSource() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('tw_token'));
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (authToken: string): Promise<User> => {
    const res = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    setUser(res.data);
    return res.data;
  };

  const login = async (newToken: string) => {
    localStorage.setItem('tw_token', newToken);
    setToken(newToken);
    await fetchProfile(newToken);
  };

  const logout = () => {
    localStorage.removeItem('tw_token');
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('tw_token');
      if (storedToken) {
        try {
          await fetchProfile(storedToken);
        } catch (err) {
          console.error("Auth initialization failed", err);
          logout();
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  return { user, token, loading, login, logout, fetchProfile };
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
