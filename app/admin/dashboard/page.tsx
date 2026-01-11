'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  AlertCircle,
//   CheckCircle,
//   Clock,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

// Types
interface DashboardStats {
  revenue: { current: number; previous: number; change: number }
  profit: { current: number; previous: number; change: number }
  orders: { current: number; previous: number; change: number }
  customers: { current: number; previous: number; change: number }
}

interface RecentOrder {
  id: string
  orderNumber: string
  customerName: string
  total: number
  status: string
  createdAt: string
}

interface Recommendation {
  id: string
  type: string
  priority: string
  title: string
  description: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // TODO: Remplacer par vrais appels API
      // const [statsRes, ordersRes, recsRes] = await Promise.all([
      //   fetch('/api/dashboard/stats'),
      //   fetch('/api/orders?limit=5'),
      //   fetch('/api/business-recommendations?onlyActive=true'),
      // ])

      // Mock data pour démonstration
      setStats({
        revenue: { current: 850000, previous: 720000, change: 18 },
        profit: { current: 340000, previous: 280000, change: 21 },
        orders: { current: 156, previous: 142, change: 10 },
        customers: { current: 89, previous: 76, change: 17 },
      })

      setRecentOrders([
        {
          id: '1',
          orderNumber: 'CMD-001',
          customerName: 'Marie Ngono',
          total: 12500,
          status: 'PENDING',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          orderNumber: 'CMD-002',
          customerName: 'Jean Mbida',
          total: 8500,
          status: 'CONFIRMED',
          createdAt: new Date().toISOString(),
        },
      ])

      setRecommendations([
        {
          id: '1',
          type: 'INVENTORY',
          priority: 'HIGH',
          title: 'Stock critique sur 3 produits',
          description: 'Gâteau Chocolat (2), Cupcakes (3), Tarte (1)',
        },
        {
          id: '2',
          type: 'MARKETING',
          priority: 'MEDIUM',
          title: 'Produits très demandés',
          description: 'Cheesecake a 150 vues ce mois',
        },
      ])

      setLoading(false)
    } catch (error) {
      console.error('Erreur chargement dashboard:', error)
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('fr-FR')} FCFA`
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
      CONFIRMED: { label: 'Confirmée', color: 'bg-blue-100 text-blue-800' },
      PREPARING: { label: 'Préparation', color: 'bg-purple-100 text-purple-800' },
      READY: { label: 'Prête', color: 'bg-green-100 text-green-800' },
      DELIVERED: { label: 'Livrée', color: 'bg-gray-100 text-gray-800' },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>
        {config.label}
      </span>
    )
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      HIGH: 'text-red-600',
      MEDIUM: 'text-orange-600',
      LOW: 'text-blue-600',
      URGENT: 'text-red-700',
    }
    return colors[priority as keyof typeof colors] || colors.MEDIUM
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-amber-700 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6">
        <h1 className="text-2xl font-bold mb-2">Tableau de bord</h1>
        <p className="text-amber-100">Vue d'ensemble de votre boutique</p>
      </div>

      <div className="p-4 md:p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Revenu */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stats!.revenue.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats!.revenue.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{Math.abs(stats!.revenue.change)}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Revenu</p>
            <p className="text-xl font-bold text-gray-900">
              {formatPrice(stats!.revenue.current)}
            </p>
          </div>

          {/* Profit */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stats!.profit.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats!.profit.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{Math.abs(stats!.profit.change)}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Profit</p>
            <p className="text-xl font-bold text-gray-900">
              {formatPrice(stats!.profit.current)}
            </p>
          </div>

          {/* Commandes */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-purple-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stats!.orders.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats!.orders.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{Math.abs(stats!.orders.change)}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Commandes</p>
            <p className="text-xl font-bold text-gray-900">{stats!.orders.current}</p>
          </div>

          {/* Clients */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stats!.customers.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stats!.customers.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{Math.abs(stats!.customers.change)}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Clients</p>
            <p className="text-xl font-bold text-gray-900">{stats!.customers.current}</p>
          </div>
        </div>

        {/* Recommandations */}
        {recommendations.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                Recommandations
              </h2>
              <Link
                href="/admin/recommendations"
                className="text-sm text-amber-700 hover:text-amber-800 font-medium"
              >
                Voir tout →
              </Link>
            </div>
            <div className="divide-y">
              {recommendations.map((rec) => (
                <div key={rec.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${getPriorityColor(rec.priority)}`}>
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">
                        {rec.title}
                      </h3>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Commandes récentes */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Commandes récentes</h2>
            <Link
              href="/admin/orders"
              className="text-sm text-amber-700 hover:text-amber-800 font-medium"
            >
              Voir tout →
            </Link>
          </div>
          <div className="divide-y">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="block p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                    <p className="text-sm text-gray-600">{order.customerName}</p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-amber-700">
                    {formatPrice(order.total)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/products/new"
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all text-center"
          >
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Package className="w-6 h-6 text-amber-700" />
            </div>
            <p className="font-semibold text-gray-900">Nouveau produit</p>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all text-center"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <ShoppingCart className="w-6 h-6 text-purple-700" />
            </div>
            <p className="font-semibold text-gray-900">Commandes</p>
          </Link>

          <Link
            href="/admin/sales"
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all text-center"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <BarChart3 className="w-6 h-6 text-green-700" />
            </div>
            <p className="font-semibold text-gray-900">Ventes</p>
          </Link>

          <Link
            href="/admin/customers"
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all text-center"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6 text-blue-700" />
            </div>
            <p className="font-semibold text-gray-900">Clients</p>
          </Link>
        </div>
      </div>
    </div>
  )
}