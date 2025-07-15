'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

import LoginPage from './(auth)/login/page';

export default function MainPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/home'); 
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return <p>Loading...</p>;
  }
  return <LoginPage />;
}