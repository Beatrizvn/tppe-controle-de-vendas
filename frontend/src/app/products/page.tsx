'use client';

import { useState, useEffect } from 'react';
import AddProductModal, { ProductInputs } from '@/components/AddProductModal';
import AddSupplierModal, { SupplierInputs } from '@/components/AddSupplierModal';
import { api } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { SupplierList } from '@/components/SupplierList';
import { ProductList } from '@/components/ProductList';


export interface Supplier {
  id: number;
  companyName: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  // description: string;
  salePrice: number;
  category: string;
  stock: number;
  supplierId: number;
}

export default function ManagementPage() {
  const [activeTab, setActiveTab] = useState<'Products' | 'Supplier'>('Products');
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [openModal, setOpenModal] = useState<'product' | 'supplier' | null>(null);
  const [editingItem, setEditingItem] = useState<Product | Supplier | null>(null);

  const { user } = useAuth();

  const handleOpenEditModal = (item: Product | Supplier, type: 'product' | 'supplier') => {
    setEditingItem(item);
    setOpenModal(type);
  };

  const handleOpenAddModal = () => {
    setEditingItem(null); 
    setOpenModal(isProductsTab ? 'product' : 'supplier');
  };

  const closeModalAndReset = () => {
    setOpenModal(null);
    setEditingItem(null);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [productsResponse, suppliersResponse] = await Promise.all([
          api.get(`/products/userid/${user?.id}`),
          api.get(`/suppliers/userid/${user?.id}`)
        ]);
        setProducts(productsResponse.data);
        setSuppliers(suppliersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  const handleDeleteProduct = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDeleteSupplier = async (id: number) => {
    try {
      await api.delete(`/suppliers/${id}`);
      setSuppliers(suppliers.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  const handleAddProduct = async (productData: ProductInputs & { userId: number }) => {
    try {
      const response = await api.post('/products', productData);
      setProducts(prev => [...prev, response.data]);
      setOpenModal(null);
      closeModalAndReset()
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleAddSupplier = async (supplierData: SupplierInputs & { userId: number }) => {
    try {
      const response = await api.post('/suppliers', {
        ...supplierData
      });

      setSuppliers(prev => [...prev, response.data]);
      setOpenModal(null);
      closeModalAndReset()
    } catch (error) {
      console.error("Error adding supplier:", error);
    }
  };

  const handleUpdateProduct = async (productData: ProductInputs) => {
    if (!editingItem) return;
    try {
      const response = await api.put(`/products/${editingItem.id}`, productData);
      // Atualiza a lista de produtos no estado com o produto modificado
      setProducts(products.map(p => p.id === editingItem.id ? response.data : p));
      closeModalAndReset();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleUpdateSupplier = async (supplierData: SupplierInputs) => {
    if (!editingItem) return;
    try {
      const response = await api.put(`/suppliers/${editingItem.id}`, supplierData);
      setSuppliers(suppliers.map(s => s.id === editingItem.id ? response.data : s));
      closeModalAndReset();
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  };


  const isProductsTab = activeTab === 'Products';

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {isProductsTab ? 'Your Products' : 'Your Suppliers'}
          </h1>
          <p className="text-gray-500">
            There are {isProductsTab ? products.length : suppliers.length} {isProductsTab ? 'products' : 'suppliers'} in this list
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('Products')}
                className={`py-2 px-4 text-sm font-medium ${isProductsTab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab('Supplier')}
                className={`py-2 px-4 text-sm font-medium ${!isProductsTab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Supplier
              </button>
            </div>
            <button
              onClick={() => setOpenModal(isProductsTab ? 'product' : 'supplier')}
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              {isProductsTab ? 'Add Product' : 'Add Supplier'}
            </button>
          </div>

          {isProductsTab ? (
            <ProductList supplierList={suppliers} products={products} onDelete={handleDeleteProduct} onEdit={(product) => handleOpenEditModal(product, 'product')} />
          ) : (
            <SupplierList suppliers={suppliers} onDelete={handleDeleteSupplier} onEdit={(supplier) => handleOpenEditModal(supplier, 'supplier')} />
          )}

            <AddProductModal
              isOpen={openModal === 'product'}
              onClose={closeModalAndReset}
              onConfirm={(data) => {
                if (!user?.id) return;
                if (editingItem) {
                  handleUpdateProduct(data);
                } else {
                  handleAddProduct({ ...data, userId: user.id });
                }
              }}
              suppliers={suppliers}
              productToEdit={openModal === 'product' ? editingItem as Product : null}
            />
            <AddSupplierModal
              isOpen={openModal === 'supplier'}
              onClose={closeModalAndReset}
              onConfirm={(data) => {
                if (!user?.id) return;
                if (editingItem) {
                  handleUpdateSupplier(data);
                } else {
                  handleAddSupplier({ ...data, userId: user.id });
                }
              }}
              supplierToEdit={openModal === 'supplier' ? editingItem as Supplier : null} 
            />
        </div>
      </div>
    </div>
  );
}