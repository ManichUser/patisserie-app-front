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
import { Order } from '@/lib/types'
import OrderCard from '@/components/admin/OrderCard'



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
        <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-full animate-spin" />
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
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
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
          filteredOrders.map((order) => (   
             <OrderCard key={order.id} order={order} />
            )
        ))
        }
      </div>
    </div>
  )
}