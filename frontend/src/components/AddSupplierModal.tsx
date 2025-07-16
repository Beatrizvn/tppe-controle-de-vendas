'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IoClose } from "react-icons/io5";

export type SupplierInputs = {
  companyName: string;
  cnpj: string;
  email: string;
  address: string;
  phone: string;
};

interface AddSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: SupplierInputs) => void;
}

export default function AddSupplierModal({ isOpen, onClose, onConfirm }: AddSupplierModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<SupplierInputs>();

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit: SubmitHandler<SupplierInputs> = (data) => {
    onConfirm(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Supplier</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><IoClose size={24} /></button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Name</label>
              <input 
                id="companyName"
                {...register("companyName", { required: "Name is required" })}
                className={`mt-1 block w-full border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input 
                id="phone"
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                //   pattern: {
                //     value: /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/,
                //     message: "Invalid phone format"
                //   }
                })}
                placeholder="(99) 99999-9999"
                className={`mt-1 block w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">CNPJ</label>
              <input 
                id="cnpj"
                {...register("cnpj", { 
                  required: "CNPJ is required",
                //   pattern: {
                //     value: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
                //     message: "Invalid CNPJ format (XX.XXX.XXX/XXXX-XX)"
                //   }
                })}
                placeholder="XX.XXX.XXX/XXXX-XX"
                className={`mt-1 block w-full border ${errors.cnpj ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.cnpj && <p className="text-red-500 text-xs mt-1">{errors.cnpj.message}</p>}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input 
                id="address"
                {...register("address", { required: "Address is required" })}
                className={`mt-1 block w-full border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                id="email"
                type="email"
                {...register("email", { 
                  required: "Email is required",
                //   pattern: {
                //     value: /^\S+@\S+\.\S+$/,
                //     message: "Invalid email address"
                //   }
                })}
                className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
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
