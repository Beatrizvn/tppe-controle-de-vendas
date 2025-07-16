'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IoClose } from "react-icons/io5";

interface Supplier {
  id: number;
  companyName: string;
}

export type ProductInputs = {
  name: string;
  code: string;
  salePrice: number;
  category: string;
  supplierId: number; 
  costPrice: number;
  description: string;
  stock: number;
};

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: ProductInputs & { stock: number }) => void;
  suppliers: Supplier[];
}

export default function AddProductModal({ isOpen, onClose, onConfirm, suppliers }: AddProductModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProductInputs>();

  useEffect(() => {
    if (isOpen) {
      reset(); 
    }
  }, [isOpen, reset]);

    const onSubmit: SubmitHandler<ProductInputs> = (data) => {
        const supplierIdNumber = typeof data.supplierId === "string" ? parseInt(data.supplierId, 10) : data.supplierId;
        onConfirm({ ...data, supplierId: supplierIdNumber });
    };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><IoClose size={24} /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input 
                id="name"
                {...register("name", { required: "Name is required" })}
                className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <input 
                id="category"
                {...register("category", { required: "Category is required" })}
                className={`mt-1 block w-full border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
            </div>
            
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">Code</label>
              <input 
                id="code"
                {...register("code", { required: "Code is required" })}
                className={`mt-1 block w-full border ${errors.code ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code.message}</p>}
            </div>
            
            <div>
              <label htmlFor="supplierId" className="block text-sm font-medium text-gray-700">Supplier</label>
              <select 
                id="supplierId"
                {...register("supplierId", { required: "Please select a supplier" })}
                className={`mt-1 block w-full border ${errors.supplierId ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
                defaultValue=""
              >
                <option value="" disabled>Select a supplier</option>
                {suppliers.map(supplier => (
                  <option key={supplier.id} value={supplier.id}>{supplier.companyName}</option>
                ))}
              </select>
              {errors.supplierId && <p className="text-red-500 text-xs mt-1">{errors.supplierId.message}</p>}
            </div>

            <div>
              <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700">Price</label>
              <input 
                id="sellingPrice"
                type="number"
                step="0.01"
                {...register("salePrice", { required: "Price is required", valueAsNumber: true, min: { value: 0.01, message: "Price must be positive" } })}
                className={`mt-1 block w-full border ${errors.salePrice ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.salePrice && <p className="text-red-500 text-xs mt-1">{errors.salePrice.message}</p>}
            </div>

            <div>
              <label htmlFor="costPrice" className="block text-sm font-medium text-gray-700">Purchase value (per item)</label>
              <input 
                id="purchasePrice"
                type="number"
                step="0.01"
                {...register("costPrice", { required: "Purchase value is required", valueAsNumber: true, min: { value: 0.01, message: "Value must be positive" } })}
                className={`mt-1 block w-full border ${errors.costPrice ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.costPrice && <p className="text-red-500 text-xs mt-1">{errors.costPrice.message}</p>}
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Quantity in stock</label>
              <input 
                id="stock"
                type="number"
                step="0.01"
                {...register("stock", { required: "Stock value is required", valueAsNumber: true, min: { value: 0.01, message: "Value must be positive" } })}
                className={`mt-1 block w-full border ${errors.costPrice ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
            </div>
          </div>
          
          <div className="flex justify-end mt-8 space-x-4">
            <button type="button" onClick={onClose} className="py-2 px-6 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200">
              Cancel
            </button>
            <button type="submit" className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}