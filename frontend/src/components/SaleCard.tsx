import { Sale } from "@/app/sales/page";

export const SaleCard = ({ sale, isFirst }: { sale: Sale, isFirst: boolean }) => {

  const formattedDate = new Date(sale.date).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
  
  return (
    <div className={`flex flex-col items-center justify-center p-6 text-center ${!isFirst ? 'md:border-l border-gray-200' : ''}`}>
      <span className="text-xs font-semibold text-white bg-blue-500 rounded-full px-3 py-1 mb-4">
        {formattedDate}
      </span>
      <h3 className="text-xl font-bold text-gray-800">
        {sale.soldItems?.[0]?.product.name || 'Venda sem produto'}
      </h3>
      <p className="text-gray-500 mt-1">
        ${parseFloat(String(sale.total)).toFixed(2)} - {sale.customer?.name || 'N/A'}
      </p>
    </div>
  );
};