'use client';

import { Product } from '@/app/products/page';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';

// Interfaces para as props e para o formulário
interface Customer { id: number; name: string; }

interface SaleInputs {
  customerId: string; // O valor do select vem como string
  date: string;
  productId: string; // O valor do select vem como string
  quantity: number;
  price: number;
};

interface AddSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  customers: Customer[];
  products: Product[];
}

export const AddSaleModal = ({ isOpen, onClose, onConfirm, customers, products }: AddSaleModalProps) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<SaleInputs>();

  if (!isOpen) return null;

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProductId = Number(e.target.value);
    const selectedProduct = products.find(p => p.id === selectedProductId);
    if (selectedProduct) {
      setValue('price', selectedProduct.salePrice);
    }
  };

  const onSubmit: SubmitHandler<SaleInputs> = (data) => {
    const formattedData = {
      customer: { id: Number(data.customerId) },
      date: new Date(data.date).toISOString(),
      soldProducts: [{
        product: { id: Number(data.productId) }, 
        quantity: Number(data.quantity),
        price: Number(data.price),
      }],
    };
    onConfirm(formattedData);
    reset();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Sale</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><IoClose size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="customerId" className="block text-sm font-medium text-gray-700">Customer</label>
            <select
              id="customerId"
              {...register("customerId", { required: "Please select a customer" })}
              className={`mt-1 block w-full border ${errors.customerId ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
              defaultValue=""
            >
              <option value="" disabled>Select a customer...</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
            </select>
            {errors.customerId && <p className="text-red-500 text-xs mt-1">{errors.customerId.message}</p>}
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Sale Date</label>
            <input id="date" type="date" {...register("date", { required: "Date is required" })} className={`mt-1 block w-full border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`} />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
          </div>

          <h3 className="text-lg font-medium pt-2">Product</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3 sm:col-span-2">
              <label htmlFor="productId" className="text-sm">Product</label>
              <select
                id="productId"
                {...register("productId", { required: "Please select a product" })}
                onChange={handleProductChange}
                className={`mt-1 w-full border ${errors.productId ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                defaultValue=""
              >
                <option value="" disabled>Select a product...</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
            </div>
            
            <div className="col-span-3 sm:col-span-1">
              <label htmlFor="quantity" className="text-sm">Quantity</label>
              <input id="quantity" type="number" defaultValue={1} {...register("quantity", { required: true, min: 1, valueAsNumber: true })} className={`mt-1 w-full border ${errors.quantity ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`} />
            </div>
          </div>

           <div>
              <label htmlFor="price" className="text-sm">Unit Price</label>
              <input id="price" type="number" step="0.01" {...register("price", { required: true, min: 0.01, valueAsNumber: true })} readOnly className={`mt-1 w-full border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 bg-gray-100`} />
           </div>
          
          <div className="flex justify-end mt-6 space-x-4">
            <button type="button" onClick={onClose} className="py-2 px-6 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200">Cancel</button>
            <button type="submit" className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};