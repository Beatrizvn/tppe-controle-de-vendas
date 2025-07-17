'use client';

import { FaEdit, FaTrash } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Customer } from '@/app/sales/page';

export const CustomerList = ({ customers, onDelete, onEdit }: {
  customers: Customer[];
  onDelete: (id: number) => void;
  onEdit: (customer: Customer) => void;
}) => {
  return (
    <div className="space-y-4">

      <div className="grid grid-cols-10 gap-4 px-4 text-left text-xs text-gray-500 uppercase font-medium">
        <div className="col-span-3">Name</div>
        <div className="col-span-3">Phone</div>
        <div className="col-span-3">Address</div>
        <div className="col-span-1 text-right">Remove</div>
      </div>

      {customers.map((customer) => (
        <div key={customer.id} className="grid grid-cols-10 gap-4 items-center bg-white hover:bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="col-span-3 font-semibold text-gray-800">{customer.name}</div>
          <div className="col-span-3 text-gray-700">{customer.phone || 'N/A'}</div>
          <div className="col-span-3 text-gray-700">{customer.address}</div>
          <div className="col-span-1 flex items-center justify-end space-x-4">
            <button onClick={() => onDelete(customer.id)} className="text-gray-400 hover:text-red-500">
              <FaTrash size={16} />
            </button>
            <button onClick={() => onEdit(customer)} className="text-blue-500 hover:text-blue-700">
              <FaEdit />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};