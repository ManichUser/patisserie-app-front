import { formatPrice } from "@/lib/constants";
import { Order } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Package, Phone, MapPin, Calendar, ChevronRight, CheckCircle, Clock, Truck, XCircle } from "lucide-react";
import Link from "next/link";


const getStatusConfig = (status: string) => {
    const configs = {
      PENDING: {
        label: 'En attente',
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock,
      },
      CONFIRMED: {
        label: 'Confirmée',
        color: 'bg-blue-100 text-blue-800',
        icon: CheckCircle,
      },
      PREPARING: {
        label: 'Préparation',
        color: 'bg-purple-100 text-purple-800',
        icon: Package,
      },
      READY: {
        label: 'Prête',
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
      },
      DELIVERED: {
        label: 'Livrée',
        color: 'bg-gray-100 text-gray-800',
        icon: Truck,
      },
      CANCELLED: {
        label: 'Annulée',
        color: 'bg-red-100 text-red-800',
        icon: XCircle,
      },
    }
    return configs[status as keyof typeof configs] || configs.PENDING
  }
export default function OrderCard({order}:{order:Order}) {

    const statusConfig = getStatusConfig(order.status)
    const StatusIcon = statusConfig.icon
    return (
        <Link
        
        href={`/admin/orders/${order.id}`}
        className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <p className="font-bold text-gray-900">{order.orderNumber}</p>
                <p className="text-xs text-gray-500">
                  {formatDate(order.createdAt)}
                </p>
              </div>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusConfig.color}`}>
              <StatusIcon className="w-3 h-3" />
              {statusConfig.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Client Info */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-blue-700" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{order.deliveryName}</p>
              <p className="text-sm text-gray-600">{order.deliveryPhone}</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-green-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">{order.deliveryAddress}</p>
              <p className="text-xs text-gray-500">
                {order.deliveryDistrict}, {order.deliveryCity}
              </p>
            </div>
          </div>

          {/* Scheduled */}
          {order.scheduledAt && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-purple-700" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  Programmée pour {formatDate(order.scheduledAt)}
                </p>
              </div>
            </div>
          )}

          {/* Items */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs font-semibold text-gray-600 mb-2">
              {order.items.length} article{order.items.length > 1 ? 's' : ''}
            </p>
            <div className="space-y-1">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">
                    {item.quantity}x {item.productName}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              {order.paymentStatus === 'PAID' && (
                <span className="text-xs text-green-600 font-semibold">✓ Payé</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-amber-700">
                {formatPrice(order.total)}
              </p>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </Link>

    )
}