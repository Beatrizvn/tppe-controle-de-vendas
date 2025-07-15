"use client"

import { createContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';

// Tipagem para os dados do usuário que você espera receber do backend
interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: SignInCredentials) => Promise<void>;
}

interface SignInCredentials {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/users/login', { email, password });

      const { user: userData, token } = response.data;

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(userData);
      router.push('/'); 
    } catch (error) {
      console.error("Falha no login:", error);
      // alert('Email ou senha inválidos!');
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}