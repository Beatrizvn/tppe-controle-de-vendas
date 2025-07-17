'use client'; 

import { useAuth } from '@/hooks/useAuth';
import Header from './Header'; 
import { usePathname } from 'next/navigation';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  return (
    <>
      {isAuthenticated && !isAuthPage && <Header />}
      
      <main>{children}</main>
    </>
  );
}