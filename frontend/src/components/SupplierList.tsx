import { Supplier } from "@/app/products/page";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";

export const SupplierList = ({ suppliers, onDelete, onEdit }: { 
  suppliers: Supplier[]; 
  onDelete: (id: number) => void; 
  onEdit: (supplier: Supplier) => void;
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-4 px-4 text-left text-xs text-gray-500 uppercase font-medium">
        <div className="col-span-3">Supplier</div>
        <div className="col-span-3">CNPJ</div>
        <div className="col-span-2">Email</div>
        <div className="col-span-3">Endereço</div>
        <div className="col-span-1 text-right">Remove</div>
      </div>
      {suppliers.map((supplier) => (
        <div key={supplier.id} className="grid grid-cols-12 gap-4 items-center bg-white hover:bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="col-span-3 font-semibold text-gray-800">{supplier.companyName}</div>
          <div className="col-span-3 text-gray-700">{supplier.cnpj}</div>
          <div className="col-span-2 text-gray-700">{supplier.email}</div>
          <div className="col-span-3 text-gray-700">{supplier.address}</div>
          <div className="col-span-1 flex items-center justify-end space-x-4">
            <button onClick={() => onDelete(supplier.id)} className="text-gray-400 hover:text-red-500"><FaTrash size={16} /></button>
            <button onClick={() => onEdit(supplier)} className="text-blue-500 hover:text-blue-700">
              <FaEdit />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};