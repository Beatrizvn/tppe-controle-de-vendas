'use client';

import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';

interface User {
  id: number;
  name: string;
  email: string;
}
type ProfileInputs = {
  name: string;
  email: string;
  password?: string; 
};

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: Partial<ProfileInputs>) => void; 
  currentUser: User | null;
}

export const ProfileModal = ({ isOpen, onClose, onConfirm, currentUser }: ProfileModalProps) => {
  const { 
    register,
    handleSubmit,
    reset,
    formState: { errors } 
  } = useForm<ProfileInputs>();

  useEffect(() => {
    if (currentUser && isOpen) {
      reset({
        name: currentUser.name,
        email: currentUser.email,
        password: '', 
      });
    }
  }, [currentUser, isOpen, reset]);

  const onSubmit: SubmitHandler<ProfileInputs> = (data) => {
    const dataToSubmit: Partial<ProfileInputs> = {
      name: data.name,
      email: data.email,
    };

    if (data.password && data.password.trim() !== '') {
      dataToSubmit.password = data.password;
    }

    onConfirm(dataToSubmit);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
            <input 
              id="email"
              type="email"
              {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" } })}
              className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
            <input 
              id="password"
              type="password"
              placeholder="Leave blank to keep the same"
              {...register("password", { minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              className={`mt-1 block w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          
          <div className="pt-6">
            <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};