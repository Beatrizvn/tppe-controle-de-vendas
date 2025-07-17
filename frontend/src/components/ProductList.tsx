import { FaEdit, FaTrash } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Product } from '@/app/products/page';

export const ProductList = ({
  products,
  onDelete,
  onEdit
}: {
  products: Product[];
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void;
}) => {
  const getStatusClass = (quantity: number) =>
    quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-10 gap-4 px-4 text-left text-xs text-gray-500 uppercase font-medium">
        <div className="col-span-3">Product</div>
        <div className="col-span-2">Price</div>
        <div className="col-span-2">Stock</div>
        <div className="col-span-2">Supplier</div>
        <div className="col-span-1 text-right">Remove</div>
      </div>

      {products.map((product) => (
        <div
          key={product.id}
          className="grid grid-cols-10 gap-4 items-center bg-white hover:bg-gray-50 p-4 rounded-lg border border-gray-200"
        >
          <div className="col-span-3">
            <p className="font-semibold text-gray-800">{product.name}</p>
            <p className="text-sm text-gray-500">
              {product.description || product.category}
            </p>
          </div>

          <div className="col-span-2 text-gray-700">${product.salePrice}</div>

          <div className="col-span-2">
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(
                product.stock
              )}`}
            >
              {product.stock > 0 ? 'In Stock' : 'Stock Out'}
            </span>
          </div>

          <div className="col-span-2 text-gray-700">
            {product.supplier?.companyName || 'N/A'}
          </div>

          <div className="col-span-1 flex items-center justify-end space-x-4">
            <button
              onClick={() => onDelete(product.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <FaTrash size={16} />
            </button>
            <button onClick={() => onEdit(product)} className="text-blue-500 hover:text-blue-700">
              <FaEdit />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
