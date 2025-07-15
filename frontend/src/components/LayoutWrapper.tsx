'use client'; // 👈 Essencial para usar hooks de cliente

import { useAuth } from '@/hooks/useAuth';
import Header from './Header'; // Ajuste o caminho se necessário
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