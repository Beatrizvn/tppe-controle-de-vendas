'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';

type CustomerInputs = {
  name: string;
  phone: string;
  address: string;
};

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: CustomerInputs) => void;
}

export const AddCustomerModal = ({ isOpen, onClose, onConfirm }: AddCustomerModalProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CustomerInputs>();

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit: SubmitHandler<CustomerInputs> = (data) => {
    onConfirm(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Customer</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><IoClose size={24} /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input 
              id="name"
              {...register("name", { required: "Name is required" })}
              className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input 
              id="phone"
              type="tel"
              {...register("phone", { required: "Phone is required" })}
              className={`mt-1 block w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input 
              id="address"
              {...register("address", { required: "Address is required" })}
              className={`mt-1 block w-full border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
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