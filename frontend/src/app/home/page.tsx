'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth'; 
import { FiUser } from 'react-icons/fi'; 
import { Sale } from '../sales/page';
import { SaleCard } from '@/components/SaleCard';
import { ProfileModal } from '@/components/ProfileModal';

export default function HomePage() {
  const { user } = useAuth();
  const [recentSales, setRecentSales] = useState<Sale[]>([]);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    if (user?.id) {
      const fetchRecentSales = async () => {
        try {
          const response = await fetch(`${apiUrl}/sales/userid/${user.id}`);
          if (!response.ok) throw new Error('Failed to fetch sales');
          
          const allSales: Sale[] = await response.json();
          
          const sortedSales = allSales.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setRecentSales(sortedSales.slice(0, 3));

        } catch (error) {
          console.error("Error fetching sales:", error);
        }
      };
      fetchRecentSales();
    }
  }, [user, apiUrl]);

    const handleUpdateProfile = async (profileData: Partial<{ name: string; email: string; password?: string; }>) => {
    if (!user?.id) return alert('User not authenticated');

    try {
      const response = await fetch(`${apiUrl}/users/${user.id}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      alert('Profile updated successfully!');
      setProfileModalOpen(false);
      
      // if (refreshUserData) refreshUserData();

    } catch (error) {
      console.error('Error updating profile:', error);
      alert(`Error: ${error.message}`);
    }
  };

  if (!user) {
    return <div className="p-8">Carregando...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center">
          <h1 className="text-3xl font-bold text-gray-900 mr-4">
            Hello, {user.name}
          </h1>
          <button className="flex flex-row gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors">
            <FiUser />
            Profile
          </button>
        </div>
      </header>

      <main className="py-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Our Recent Sales
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3">
              {recentSales.length > 0 ? (
                recentSales.map((sale, index) => (
                  <SaleCard key={sale.id} sale={sale} isFirst={index === 0} />
                ))
              ) : (
                <p className="col-span-3 text-center text-gray-500">No recent sales to display.</p>
              )}
            </div>
          </div>
        </div>
      </main>

      <ProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onConfirm={handleUpdateProfile}
        currentUser={user}
      />
    </div>
  );
}