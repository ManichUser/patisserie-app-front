// src/app/profile/orders/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, ChevronRight } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  itemCount: number;
  items: string[];
}

export default function OrderHistoryPage() {
  const router = useRouter();
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      date: '2026-01-08',
      status: 'completed',
      total: 45.50,
      itemCount: 3,
      items: ['Chocolate Cake', 'Vanilla Cupcake', 'Strawberry Tart'],
    },
    {
      id: 'ORD-002',
      date: '2026-01-05',
      status: 'processing',
      total: 28.00,
      itemCount: 2,
      items: ['Red Velvet Cake', 'Macaron Box'],
    },
    {
      id: 'ORD-003',
      date: '2026-01-01',
      status: 'completed',
      total: 15.00,
      itemCount: 1,
      items: ['Croissant'],
    },
  ]);

  const getStatusConfig = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return { icon: Clock, text: 'En attente', bg: 'bg-yellow-50', textColor: 'text-yellow-700', iconColor: 'text-yellow-600' };
      case 'processing':
        return { icon: Package, text: 'En cours', bg: 'bg-blue-50', textColor: 'text-blue-700', iconColor: 'text-blue-600' };
      case 'completed':
        return { icon: CheckCircle, text: 'Complété', bg: 'bg-green-50', textColor: 'text-green-700', iconColor: 'text-green-600' };
      case 'cancelled':
        return { icon: XCircle, text: 'Annulé', bg: 'bg-red-50', textColor: 'text-red-700', iconColor: 'text-red-600' };
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Order History</h1>
        </div>
      </header>

      <div className="px-6 py-6">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
            <p className="text-gray-500">Your order history will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;

              return (
                <button
                  key={order.id}
                  onClick={() => router.push(`/profile/orders/${order.id}`)}
                  className="w-full bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Order #{order.id}</h3>
                      <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${statusConfig.bg}`}>
                      <StatusIcon className={`w-4 h-4 ${statusConfig.iconColor}`} />
                      <span className={`text-xs font-semibold ${statusConfig.textColor}`}>
                        {statusConfig.text}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.items.map((item, idx) => (
                      <p key={idx} className="text-sm text-gray-600">• {item}</p>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500">{order.itemCount} item(s)</p>
                      <p className="text-xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}