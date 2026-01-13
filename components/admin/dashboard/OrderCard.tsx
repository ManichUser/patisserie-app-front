// components/admin/dashboard/OrderCard.tsx
'use client';

import Link from 'next/link';

interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  total: number;
  status: string;
  createdAt: string;
}

interface OrderCardProps {
  order: RecentOrder;
}

const STATUS_CONFIG = {
  PENDING: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
  CONFIRMED: { label: 'Confirmée', color: 'bg-blue-100 text-blue-800' },
  PREPARING: { label: 'Préparation', color: 'bg-purple-100 text-purple-800' },
  READY: { label: 'Prête', color: 'bg-green-100 text-green-800' },
  DELIVERED: { label: 'Livrée', color: 'bg-gray-100 text-gray-800' },
};

export function OrderCard({ order }: OrderCardProps) {
  const config = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.PENDING;

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('fr-FR')} FCFA`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR');
  };

  return (
    <Link
      href={`/admin/orders/${order.id}`}
      className="block p-4 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="font-semibold text-gray-900">{order.orderNumber}</p>
          <p className="text-sm text-gray-600">{order.customerName}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>
          {config.label}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-blue-700">
          {formatPrice(order.total)}
        </p>
        <p className="text-xs text-gray-500">
          {formatDate(order.createdAt)}
        </p>
      </div>
    </Link>
  );
}