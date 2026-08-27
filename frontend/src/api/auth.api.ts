import { apiClient } from './client';
import type { User } from '../types';

export interface LoginParams {
  username: string; // email
  password: string;
}

export interface SignupParams {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  token_type: string;
  user: User;
}

export const authApi = {
  login: async (params: LoginParams): Promise<AuthResponse> => {
    const formData = new URLSearchParams();
    formData.append('username', params.username);
    formData.append('password', params.password);

    const loginRes = await apiClient.post<{ access_token: string; token_type: string }>('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const token = loginRes.data.access_token;
    const userRes = await apiClient.get<User>('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });

    return {
      token,
      token_type: loginRes.data.token_type || 'bearer',
      user: userRes.data,
    };
  },

  signup: async (params: SignupParams): Promise<AuthResponse> => {
    await apiClient.post<User>('/auth/signup', {
      email: params.email,
      password: params.password,
      name: params.name || params.email.split('@')[0],
    });

    // Automatically log in after successful signup
    return authApi.login({
      username: params.email,
      password: params.password,
    });
  },

  getMe: async (): Promise<User> => {
    const res = await apiClient.get<User>('/auth/me');
    return res.data;
  },
};
