// src/app/profile/payment/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, CreditCard, Smartphone, Check, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button3';

interface PaymentMethod {
  id: string;
  type: 'card' | 'mobile';
  provider: string;
  last4?: string;
  phoneNumber?: string;
  expiryDate?: string;
  isDefault: boolean;
}

export default function PaymentMethodsPage() {
  const router = useRouter();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      provider: 'Visa',
      last4: '4242',
      expiryDate: '12/25',
      isDefault: true,
    },
    {
      id: '2',
      type: 'mobile',
      provider: 'MTN Mobile Money',
      phoneNumber: '+237 699 999 999',
      isDefault: false,
    },
  ]);

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods => methods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  const handleDelete = (id: string) => {
    if (confirm('Voulez-vous supprimer ce moyen de paiement ?')) {
      setPaymentMethods(methods => methods.filter(method => method.id !== id));
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-900" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Payment Methods</h1>
          </div>
          <button
            onClick={() => router.push('/profile/payment/add')}
            className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center text-white hover:bg-amber-800 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="px-6 py-6">
        {paymentMethods.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <CreditCard className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Payment Methods</h2>
            <p className="text-gray-500 mb-8">Add a payment method to checkout faster</p>
            <Button variant="primary" size="lg" onClick={() => router.push('/profile/payment/add')}>
              <Plus className="w-5 h-5" />
              Add Payment Method
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all relative"
              >
                {method.isDefault && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Default
                    </span>
                  </div>
                )}

                <div className="flex gap-4">
                  <div className={`w-12 h-12 ${method.type === 'card' ? 'bg-purple-50' : 'bg-blue-50'} rounded-xl flex items-center justify-center shrink-0`}>
                    {method.type === 'card' ? (
                      <CreditCard className="w-5 h-5 text-purple-700" />
                    ) : (
                      <Smartphone className="w-5 h-5 text-blue-700" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{method.provider}</h3>
                    {method.type === 'card' ? (
                      <>
                        <p className="text-sm text-gray-600">•••• •••• •••• {method.last4}</p>
                        <p className="text-sm text-gray-500">Expires {method.expiryDate}</p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-600">{method.phoneNumber}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  {!method.isDefault && (
                    <button
                      onClick={() => handleSetDefault(method.id)}
                      className="flex-1 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => router.push(`/profile/payment/edit/${method.id}`)}
                    className="flex-1 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(method.id)}
                    className="flex-1 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {/* Accepted Payment Methods */}
            <div className="bg-white rounded-2xl p-5 shadow-sm mt-6">
              <h3 className="font-bold text-gray-900 mb-4">We Accept</h3>
              <div className="grid grid-cols-4 gap-3">
                {['Visa', 'Mastercard', 'MTN MoMo', 'Orange Money'].map((brand) => (
                  <div
                    key={brand}
                    className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center border-2 border-gray-200"
                  >
                    <span className="text-xs font-semibold text-gray-600">{brand}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}