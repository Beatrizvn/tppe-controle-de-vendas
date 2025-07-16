'use client';

import { Product } from '@/app/products/page';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';

// --- Interfaces ---
interface Customer { id: number; name: string; }
interface AddSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  customers: Customer[];
  products: Product[];
}

// Tipagem para os dados do formulário
type SaleInputs = {
  customerId: string;
  date: string;
  productId: string;
  quantity: number;
  price: number;
  paymentType: 'UPFRONT' | 'INSTALLMENT';
  discount: number;
  installments: number;
};

export const AddSaleModal = ({ isOpen, onClose, onConfirm, customers, products }: AddSaleModalProps) => {
  const { 
    register,
    handleSubmit,
    reset,
    watch, // ALTERAÇÃO 1: Importando 'watch' para observar campos
    setValue,
    formState: { errors } 
  } = useForm<SaleInputs>({
    defaultValues: { // Valores padrão para o formulário
      quantity: 1,
      discount: 0,
      installments: 1,
      paymentType: 'UPFRONT'
    }
  });

  // Observando campos para fazer cálculos em tempo real
  const watchedPrice = watch('price', 0);
  const watchedQuantity = watch('quantity', 1);
  const watchedDiscount = watch('discount', 0);
  const watchedPaymentType = watch('paymentType');

  // Cálculo dos totais
  const subtotal = (watchedPrice || 0) * (watchedQuantity || 0);
  const total = subtotal - (watchedDiscount || 0);

  useEffect(() => {
    if (isOpen) {
      reset(); // Reseta para os valores padrão quando o modal abre
    }
  }, [isOpen, reset]);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProduct = products.find(p => p.id === Number(e.target.value));
    if (selectedProduct) {
      setValue('price', selectedProduct.salePrice);
    }
  };

  // ALTERAÇÃO 2: A função onSubmit agora constrói o payload complexo para o Prisma
  const onSubmit: SubmitHandler<SaleInputs> = (data) => {
    // Formata o payload para corresponder à 'escrita aninhada' do Prisma
    const finalPayload = {
      customerId: Number(data.customerId),
      total: total,
      soldItems: {
        create: [
          {
            productId: Number(data.productId),
            quantity: Number(data.quantity),
            unitPrice: Number(data.price),
          },
        ],
      },
      payment: {
        create: {
          type: data.paymentType,
          status: 'Pending', // Status inicial padrão
          discount: Number(data.discount),
          installments: data.paymentType === 'INSTALLMENT' ? Number(data.installments) : 1,
          finalAmount: total,
        },
      },
    };
    onConfirm(finalPayload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-800">Add New Sale</h2><button onClick={onClose} className="text-gray-500 hover:text-gray-800"><IoClose size={24} /></button></div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* --- Seção Cliente e Data --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label htmlFor="customerId" className="block text-sm font-medium text-gray-700">Customer</label><select id="customerId" {...register("customerId", { required: "Customer is required" })} className="mt-1 block w-full border rounded-md p-2" defaultValue=""><option value="" disabled>Select a customer...</option>{customers.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}</select>{errors.customerId && <p className="text-red-500 text-xs mt-1">{errors.customerId.message}</p>}</div>
            <div><label htmlFor="date" className="block text-sm font-medium text-gray-700">Sale Date</label><input id="date" type="date" {...register("date", { required: "Date is required" })} className="mt-1 block w-full border rounded-md p-2"/>{errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}</div>
          </div>

          {/* --- Seção Produto --- */}
          <h3 className="text-lg font-medium pt-2 border-b pb-2">Product</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3 sm:col-span-2"><label htmlFor="productId" className="text-sm">Product</label><select id="productId" {...register("productId", { required: "Product is required" })} onChange={handleProductChange} className="mt-1 w-full border rounded-md p-2" defaultValue=""><option value="" disabled>Select a product...</option>{products.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}</select></div>
            <div className="col-span-3 sm:col-span-1"><label htmlFor="quantity" className="text-sm">Quantity</label><input id="quantity" type="number" {...register("quantity", { required: true, min: 1, valueAsNumber: true })} className="mt-1 w-full border rounded-md p-2" /></div>
            <div><label htmlFor="price" className="text-sm">Unit Price</label><input id="price" type="number" step="0.01" {...register("price", { required: true, valueAsNumber: true })} readOnly className="mt-1 w-full border rounded-md p-2 bg-gray-100" /></div>
          </div>
          
          {/* ALTERAÇÃO 3: Nova seção de pagamento */}
          <h3 className="text-lg font-medium pt-2 border-b pb-2">Payment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
                <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700">Payment Type</label>
                <select id="paymentType" {...register("paymentType")} className="mt-1 block w-full border rounded-md p-2">
                    <option value="UPFRONT">À Vista</option>
                    <option value="INSTALLMENT">Parcelado</option>
                </select>
            </div>
             {/* Campo de parcelas aparece condicionalmente */}
            {watchedPaymentType === 'INSTALLMENT' && (
                <div>
                    <label htmlFor="installments" className="block text-sm font-medium text-gray-700">Installments</label>
                    <input id="installments" type="number" {...register("installments", { required: "Required for installment", min: 2, valueAsNumber: true })} className={`mt-1 block w-full border ${errors.installments ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}/>
                    {errors.installments && <p className="text-red-500 text-xs mt-1">{errors.installments.message}</p>}
                </div>
            )}
            <div>
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount ($)</label>
                <input id="discount" type="number" step="0.01" {...register("discount", { valueAsNumber: true, min: 0 })} className="mt-1 block w-full border rounded-md p-2"/>
            </div>
          </div>
          
          {/* Seção de Totais */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-right">
              <p className="text-gray-600">Subtotal: <span className="font-medium">${subtotal.toFixed(2)}</span></p>
              <p className="text-gray-600">Discount: <span className="font-medium text-red-500">-${(watchedDiscount || 0).toFixed(2)}</span></p>
              <p className="text-xl font-bold text-gray-900 mt-2">Total: <span className="text-blue-600">${total.toFixed(2)}</span></p>
          </div>

          <div className="flex justify-end mt-6 space-x-4"><button type="button" onClick={onClose} className="py-2 px-6 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200">Cancel</button><button type="submit" className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">Confirm Sale</button></div>
        </form>
      </div>
    </div>
  );
};