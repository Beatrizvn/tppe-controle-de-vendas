'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AddSaleModal } from '@/components/AddSaleModal';
import { SalesList } from '@/components/SalesList';
import { Product, Supplier } from '../products/page';
import { AddCustomerModal } from '@/components/AddCustomerModal';
import { CustomerList } from '@/components/CustomerList';


export interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
}

export interface SoldProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface SoldItem {
  id: number;
  product: {
    id: number;
    name: string;
  };
}
export interface Sale {
  id: number;
  date: string;
  customer: Customer;
  soldItems: SoldItem[];
  total: number;
}

export default function SalesPage() {
  const { user } = useAuth();
  const [sales, setSales] = useState<Sale[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);;
  const [inStockProducts, setInStockProducts] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState<'sale' | 'customer' | null>(null);
  const [activeTab, setActiveTab] = useState('Sales');
  const [editingItem, setEditingItem] = useState<Sale | Customer | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    if (user?.id) {
      const fetchAllData = async () => {
        try {
          const [salesRes, customersRes, productsRes] = await Promise.all([
            fetch(`${apiUrl}/sales/userid/${user.id}`),
            fetch(`${apiUrl}/customers`),
            fetch(`${apiUrl}/products`)
          ]);

          if (!salesRes.ok || !customersRes.ok || !productsRes.ok) {
            throw new Error('Failed to fetch initial data');
          }

          const salesData = await salesRes.json();
          const customersData = await customersRes.json();
          const allProductsData: Product[] = await productsRes.json();

          const availableProducts = allProductsData.filter(p => p.stock > 0);

          setSales(salesData);
          setCustomers(customersData);
          setInStockProducts(availableProducts);

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchAllData();
    }
  }, [user, apiUrl]);

  const handleDeleteSale = async (saleId: number) => {
    if (!confirm('Are you sure you want to delete this sale?')) return;
    try {
      await fetch(`${apiUrl}/sales/${saleId}`, { method: 'DELETE' });
      setSales(prevSales => prevSales.filter(sale => sale.id !== saleId));
    } catch (error) {
      console.error("Error deleting sale:", error);
    }
  };

  const handleUpdateSale = async (saleData: any) => {
    if (!editingItem) return;
    try {
      const response = await fetch(`${apiUrl}/sales/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saleData),
      });
      if (!response.ok) throw new Error('Failed to update sale');

      const updatedSale = await response.json();
      setSales(prev => prev.map(s => s.id === editingItem.id ? updatedSale : s));
      closeModalAndReset();
    } catch (error) {
      console.error("Error updating sale:", error);
    }
  };

  const handleUpdateCustomer = async (customerData: any) => {
    if (!editingItem) return;
    try {
      const response = await fetch(`${apiUrl}/customers/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData),
      });
      if (!response.ok) throw new Error('Failed to update customer');

      const updatedCustomer = await response.json();
      setCustomers(prev => prev.map(c => c.id === editingItem.id ? updatedCustomer : c));
      closeModalAndReset();
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const handleOpenEditModal = (item: Sale | Customer, type: 'sale' | 'customer') => {
    setEditingItem(item);
    setOpenModal(type);
  };

  const handleOpenAddModal = () => {
    setEditingItem(null); 
    setOpenModal(isSalesTab ? 'sale' : 'customer');
  };

  const closeModalAndReset = () => {
    setOpenModal(null);
    setEditingItem(null);
  };


  const handleAddSale = async (saleData: any) => {
    if (!user?.id) return alert('User not authenticated!');
    try {

      const finalPayload = { ...saleData, userId: user.id };

      const response = await fetch(`${apiUrl}/sales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create sale');
      }

      const newSale = await response.json();
      setSales(prev => [newSale, ...prev]);
      setOpenModal(null);
    } catch (error) {
      console.error("Error creating sale:", error);
      alert(`Failed to create sale`);
    }
  };


  const handleAddCustomer = async (customerData: any) => {
    if (!user) return alert('User not authenticated!');
    try {
      const response = await fetch(`${apiUrl}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...customerData, userId: user.id }),
      });
      if (!response.ok) throw new Error('Failed to create customer');
      const newCustomer = await response.json();
      setCustomers(prev => [newCustomer, ...prev]);
      setOpenModal(null);
    } catch (error) {
      console.error("Error creating customer:", error);
      alert('Failed to create customer.');
    }
  };

  const handleDeleteCustomer = async (customerId: number) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    try {
      await fetch(`${apiUrl}/customers/${customerId}`, { method: 'DELETE' });
      setCustomers(prev => prev.filter(customer => customer.id !== customerId));
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  if (!user) {
    return <p className="p-8">Carregando...</p>;
  }

  const isSalesTab = activeTab === 'Sales';

  return (
    <>
      <div className="bg-gray-50 min-h-screen p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {isSalesTab ? 'Your Sales' : 'Your Customers'}
            </h1>
            <p className="text-gray-500">
              There are {isSalesTab ? sales.length : customers.length} {isSalesTab ? 'sales' : 'customers'} in this list
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('Sales')}
                  className={`py-2 px-4 text-sm font-medium ${isSalesTab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                  Sales
                </button>
                <button
                  onClick={() => setActiveTab('Customer')}
                  className={`py-2 px-4 text-sm font-medium ${!isSalesTab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                  Customer
                </button>
              </div>
              <button
                onClick={() => setOpenModal(isSalesTab ? 'sale' : 'customer')}
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors">
                {isSalesTab ? 'Add Sales' : 'Add Customer'}
              </button>
            </div>

            {isSalesTab ? (
              <SalesList
                sales={sales}
                onDelete={handleDeleteSale}
                onEdit={(sale) => handleOpenEditModal(sale, 'sale')} 
              />
            ) : (
              <CustomerList
                customers={customers}
                onDelete={handleDeleteCustomer}
                onEdit={(customer) => handleOpenEditModal(customer, 'customer')} 
              />
            )}
          </div>
        </div>
      </div>

      <AddSaleModal
        isOpen={openModal === 'sale'}
        onClose={closeModalAndReset} 
        onConfirm={(data) => editingItem ? handleUpdateSale(data) : handleAddSale(data)} 
        customers={customers}
        products={inStockProducts}
        saleToEdit={openModal === 'sale' ? (editingItem as Sale) : null} 
      />
      <AddCustomerModal
        isOpen={openModal === 'customer'}
        onClose={closeModalAndReset} 
        onConfirm={(data) => editingItem ? handleUpdateCustomer(data) : handleAddCustomer(data)} 
        customerToEdit={openModal === 'customer' ? (editingItem as Customer) : null} 
      />
    </>
  );
}