"use client"

import { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { api } from '@/services/api';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: SignInCredentials) => Promise<void>;
  logout: () => void;
  refreshUserData: () => Promise<void>; 
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

  useEffect(() => {
    if(!isAuthenticated) return;
    
    const token = Cookies.get('auth_token');

    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api.get('/users/profile') 
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          Cookies.remove('auth_token');
          setUser(null);
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/users/login', { email, password });
      const { user: userData, token } = response.data;

      Cookies.set('auth_token', token, { expires: 7, secure: true });

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      router.push('/'); 
    } catch (error) {
      console.error("Falha no login:", error);
      alert('Email ou senha inválidos!');
    }
  }

  const logout = useCallback(async () => {
    try {
    } catch (error) {
      console.error("Erro ao chamar o logout do backend:", error);
    } finally {
      Cookies.remove('auth_token');
      setUser(null);
      delete api.defaults.headers.common['Authorization'];
      router.push('/login'); 
    }
  }, [router]);

  const refreshUserData = useCallback(async () => {
    if (!user?.id) {
      console.log("Nenhum usuário logado para atualizar.");
      return;
    }
    
    try {
      console.log(`Atualizando dados para o usuário ${user.id}...`);
      const response = await api.get(`/users/${user.id}`); 
      setUser(response.data); 
    } catch (error) {
      console.error("Falha ao atualizar os dados do usuário:", error);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, logout, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
}