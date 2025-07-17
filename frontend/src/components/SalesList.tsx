'use client';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Sale } from '@/app/sales/page';



const SaleRow = ({ sale, onDelete, onEdit }: {
  sale: Sale;
  onDelete: (id: number) => void;
  onEdit: (product: Sale) => void;
}) => {

  const firstProductName = sale.soldItems?.[0]?.product?.name || 'N/A';

  const totalValue = sale.total || 0;

  return (
    <div className="grid grid-cols-10 gap-4 items-center bg-white hover:bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="col-span-3 font-semibold text-gray-800">{firstProductName}</div>
      <div className="col-span-2 text-gray-700">${totalValue}</div>
      <div className="col-span-2 text-gray-700">{new Date(sale.date).toLocaleDateString()}</div>
      <div className="col-span-2 text-gray-700">{sale.customer?.name || 'N/A'}</div>
      <div className="col-span-1 flex items-center justify-end space-x-4">
        <button onClick={() => onDelete(sale.id)} className="text-gray-400 hover:text-red-500">
          <FaTrash size={16} />
        </button>
        <button onClick={() => onEdit(sale)} className="text-blue-500 hover:text-blue-700">
          <FaEdit />
        </button>
      </div>
    </div>
  );
};

export const SalesList = ({ sales, onDelete, onEdit }: {
  sales: Sale[];
  onDelete: (id: number) => void;
  onEdit: (product: Sale) => void;
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-10 gap-4 px-4 text-left text-xs text-gray-500 uppercase font-medium">
        <div className="col-span-3">Product</div>
        <div className="col-span-2">Price</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-2">Client</div>
        <div className="col-span-1 text-right">Remove</div>
      </div>

      {sales.map((sale) => (
        <SaleRow key={sale.id} sale={sale} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};