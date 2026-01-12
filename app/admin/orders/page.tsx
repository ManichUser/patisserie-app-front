'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Search,
  Filter,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Package,
  Truck,
  Calendar,
  Phone,
  MapPin,
  ChevronRight,
} from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  user: {
    id: string
    name: string
    phone: string
  }
  deliveryName: string
  deliveryPhone: string
  deliveryAddress: string
  deliveryCity: string
  deliveryDistrict: string
  status: string
  paymentStatus: string
  total: number
  subtotal: number
  deliveryFee: number
  items: {
    id: string
    productName: string
    quantity: number
    price: number
  }[]
  createdAt: string
  scheduledAt: string | null
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [stats, setStats] = useState({
    pending: 0,
    confirmed: 0,
    preparing: 0,
    ready: 0,
    delivered: 0,
  })

  useEffect(() => {
    fetchOrders()
    fetchStats()
  }, [])

  const fetchOrders = async () => {
    try {
      // TODO: const res = await fetch('/api/orders')
      // const data = await res.json()

      // Mock data
      setOrders([
        {
          id: '1',
          orderNumber: 'CMD-001',
          user: {
            id: 'u1',
            name: 'Marie Ngono',
            phone: '+237 677 88 99 00',
          },
          deliveryName: 'Marie Ngono',
          deliveryPhone: '+237 677 88 99 00',
          deliveryAddress: 'Quartier Bastos, Rue 1234',
          deliveryCity: 'Yaoundé',
          deliveryDistrict: 'Bastos',
          status: 'PENDING',
          paymentStatus: 'PENDING',
          total: 12500,
          subtotal: 11000,
          deliveryFee: 1500,
          items: [
            {
              id: 'i1',
              productName: 'Gâteau Chocolat',
              quantity: 1,
              price: 8500,
            },
            {
              id: 'i2',
              productName: 'Cupcakes',
              quantity: 2,
              price: 1250,
            },
          ],
          createdAt: new Date().toISOString(),
          scheduledAt: null,
        },
        {
          id: '2',
          orderNumber: 'CMD-002',
          user: {
            id: 'u2',
            name: 'Jean Mbida',
            phone: '+237 699 11 22 33',
          },
          deliveryName: 'Jean Mbida',
          deliveryPhone: '+237 699 11 22 33',
          deliveryAddress: 'Quartier Melen, Avenue Kennedy',
          deliveryCity: 'Yaoundé',
          deliveryDistrict: 'Melen',
          status: 'CONFIRMED',
          paymentStatus: 'PAID',
          total: 8500,
          subtotal: 8500,
          deliveryFee: 0,
          items: [
            {
              id: 'i3',
              productName: 'Red Velvet',
              quantity: 1,
              price: 8500,
            },
          ],
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          scheduledAt: new Date(Date.now() + 86400000).toISOString(),
        },
      ])
      setLoading(false)
    } catch (error) {
      console.error('Erreur chargement commandes:', error)
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    // TODO: API call
    setStats({
      pending: 12,
      confirmed: 8,
      preparing: 5,
      ready: 3,
      delivered: 45,
    })
  }

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('fr-FR')} FCFA`
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.deliveryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.deliveryPhone.includes(searchQuery)

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-amber-700 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 lg:top-0 z-30">
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Commandes</h1>
              <p className="text-sm text-gray-600 mt-1">
                {filteredOrders.length} commande{filteredOrders.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-yellow-700">{stats.pending}</p>
              <p className="text-xs text-yellow-600">En attente</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-blue-700">{stats.confirmed}</p>
              <p className="text-xs text-blue-600">Confirmées</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-purple-700">{stats.preparing}</p>
              <p className="text-xs text-purple-600">Préparation</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-green-700">{stats.ready}</p>
              <p className="text-xs text-green-600">Prêtes</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-gray-700">{stats.delivered}</p>
              <p className="text-xs text-gray-600">Livrées</p>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par N°, client, téléphone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
            >
              <option value="all">Tous les statuts</option>
              <option value="PENDING">En attente</option>
              <option value="CONFIRMED">Confirmées</option>
              <option value="PREPARING">Préparation</option>
              <option value="READY">Prêtes</option>
              <option value="DELIVERED">Livrées</option>
              <option value="CANCELLED">Annulées</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="p-4 md:p-6 space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucune commande trouvée</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const statusConfig = getStatusConfig(order.status)
            const StatusIcon = statusConfig.icon

            return (
              <Link
                key={order.id}
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
          })
        )}
      </div>
    </div>
  )
}