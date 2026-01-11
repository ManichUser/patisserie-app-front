'use client'

import { useState, useEffect } from 'react'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  CreditCard,
  AlertTriangle,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'

interface SalesStats {
  totalRevenue: number
  totalProfit: number
  averageMargin: number
  totalSales: number
  negotiatedSales: number
  totalDiscountGiven: number
}

interface Sale {
  id: string
  order: {
    orderNumber: string
    deliveryName: string
    createdAt: string
  }
  listPrice: number
  salePrice: number
  actualPrice: number
  costPrice: number
  grossProfit: number
  profitMargin: number
  wasNegotiated: boolean
  negotiationAmount: number
  paymentMethod: string
  saleDate: string
}

interface TrendData {
  date: string
  revenue: number
  profit: number
  orders: number
}

export default function AdminSalesPage() {
  const [stats, setStats] = useState<SalesStats | null>(null)
  const [sales, setSales] = useState<Sale[]>([])
  const [trends, setTrends] = useState<TrendData[]>([])
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('week') // week, month, year
  const [filter, setFilter] = useState('all') // all, negotiated
  const [selectedTab, setSelectedTab] = useState('overview') // overview, sales, trends

  useEffect(() => {
    fetchSalesData()
  }, [period])

  const fetchSalesData = async () => {
    try {
      // TODO: Remplacer par vrais appels API
      // const [statsRes, salesRes, trendsRes] = await Promise.all([
      //   fetch(`/api/sales/stats?period=${period}`),
      //   fetch('/api/sales?limit=10'),
      //   fetch(`/api/sales/trends?period=${period}`),
      // ])

      // Mock data
      setStats({
        totalRevenue: 850000,
        totalProfit: 340000,
        averageMargin: 40,
        totalSales: 156,
        negotiatedSales: 23,
        totalDiscountGiven: 45000,
      })

      setSales([
        {
          id: '1',
          order: {
            orderNumber: 'CMD-001',
            deliveryName: 'Marie Ngono',
            createdAt: new Date().toISOString(),
          },
          listPrice: 10000,
          salePrice: 8500,
          actualPrice: 7500,
          costPrice: 4000,
          grossProfit: 3500,
          profitMargin: 46.7,
          wasNegotiated: true,
          negotiationAmount: 1000,
          paymentMethod: 'CASH',
          saleDate: new Date().toISOString(),
        },
        {
          id: '2',
          order: {
            orderNumber: 'CMD-002',
            deliveryName: 'Jean Mbida',
            createdAt: new Date().toISOString(),
          },
          listPrice: 6500,
          salePrice: 6500,
          actualPrice: 6500,
          costPrice: 3000,
          grossProfit: 3500,
          profitMargin: 53.8,
          wasNegotiated: false,
          negotiationAmount: 0,
          paymentMethod: 'MOBILE_MONEY',
          saleDate: new Date().toISOString(),
        },
      ])

      setTrends([
        { date: '2026-01-05', revenue: 45000, profit: 18000, orders: 12 },
        { date: '2026-01-06', revenue: 52000, profit: 21000, orders: 15 },
        { date: '2026-01-07', revenue: 48000, profit: 19000, orders: 13 },
        { date: '2026-01-08', revenue: 61000, profit: 24000, orders: 18 },
        { date: '2026-01-09', revenue: 55000, profit: 22000, orders: 16 },
        { date: '2026-01-10', revenue: 58000, profit: 23000, orders: 17 },
        { date: '2026-01-11', revenue: 67000, profit: 27000, orders: 20 },
      ])

      setLoading(false)
    } catch (error) {
      console.error('Erreur chargement ventes:', error)
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('fr-FR')} FCFA`
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
    })
  }

  const exportData = () => {
    // TODO: Générer CSV/Excel
    alert('Export en cours...')
  }

  const filteredSales = sales.filter((sale) => {
    if (filter === 'all') return true
    if (filter === 'negotiated') return sale.wasNegotiated
    return true
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ventes & Comptabilité</h1>
              <p className="text-sm text-gray-600 mt-1">
                Analyse des performances financières
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm"
              >
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="year">Cette année</option>
              </select>

              <button
                onClick={exportData}
                className="flex items-center gap-2 bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Exporter</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'overview', label: 'Vue d\'ensemble' },
              { id: 'sales', label: 'Ventes détaillées' },
              { id: 'trends', label: 'Tendances' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  selectedTab === tab.id
                    ? 'bg-amber-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Revenu Total */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+18%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">Revenu Total</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatPrice(stats!.totalRevenue)}
                </p>
              </div>

              {/* Profit */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <PiggyBank className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+21%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">Profit Net</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatPrice(stats!.totalProfit)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Marge: {stats!.averageMargin}%
                </p>
              </div>

              {/* Ventes */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">Total Ventes</p>
                <p className="text-xl font-bold text-gray-900">{stats!.totalSales}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Panier moyen: {formatPrice(stats!.totalRevenue / stats!.totalSales)}
                </p>
              </div>

              {/* Négociations */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">Négociations</p>
                <p className="text-xl font-bold text-gray-900">
                  {stats!.negotiatedSales}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Réduction: {formatPrice(stats!.totalDiscountGiven)}
                </p>
              </div>
            </div>

            {/* Performance par méthode de paiement */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Méthodes de paiement</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">💵</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Cash</p>
                      <p className="text-sm text-gray-600">68 ventes</p>
                    </div>
                  </div>
                  <p className="font-bold text-gray-900">{formatPrice(420000)}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg">📱</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Mobile Money</p>
                      <p className="text-sm text-gray-600">88 ventes</p>
                    </div>
                  </div>
                  <p className="font-bold text-gray-900">{formatPrice(430000)}</p>
                </div>
              </div>
            </div>

            {/* Top 5 Produits Rentables */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Top 5 Produits Rentables</h2>
              <div className="space-y-3">
                {[
                  { name: 'Gâteau Chocolat', sales: 45, profit: 180000 },
                  { name: 'Cheesecake Passion', sales: 38, profit: 152000 },
                  { name: 'Red Velvet', sales: 32, profit: 128000 },
                  { name: 'Tarte Citron', sales: 28, profit: 98000 },
                  { name: 'Macarons', sales: 25, profit: 87500 },
                ].map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-amber-700 text-sm">
                          #{index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-600">{product.sales} ventes</p>
                      </div>
                    </div>
                    <p className="font-bold text-green-600 text-sm">
                      {formatPrice(product.profit)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sales Tab */}
        {selectedTab === 'sales' && (
          <div className="space-y-4">
            {/* Filter */}
            <div className="flex items-center gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm"
              >
                <option value="all">Toutes les ventes</option>
                <option value="negotiated">Ventes négociées</option>
              </select>
            </div>

            {/* Sales List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                        Commande
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                        Client
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">
                        Prix Liste
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">
                        Prix Réel
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">
                        Profit
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">
                        Marge
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">
                        Négocié
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredSales.map((sale) => (
                      <tr key={sale.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <p className="font-semibold text-sm text-gray-900">
                            {sale.order.orderNumber}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(sale.saleDate)}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-gray-900">
                            {sale.order.deliveryName}
                          </p>
                          <p className="text-xs text-gray-500">{sale.paymentMethod}</p>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <p className="text-sm text-gray-900">
                            {formatPrice(sale.listPrice)}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <p className="text-sm font-semibold text-gray-900">
                            {formatPrice(sale.actualPrice)}
                          </p>
                          {sale.wasNegotiated && (
                            <p className="text-xs text-red-600">
                              -{formatPrice(sale.negotiationAmount)}
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <p className="text-sm font-semibold text-green-600">
                            {formatPrice(sale.grossProfit)}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span
                            className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                              sale.profitMargin >= 40
                                ? 'bg-green-100 text-green-700'
                                : sale.profitMargin >= 25
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {sale.profitMargin.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {sale.wasNegotiated ? (
                            <span className="text-orange-600">✓</span>
                          ) : (
                            <span className="text-gray-300">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Trends Tab */}
        {selectedTab === 'trends' && (
          <div className="space-y-6">
            {/* Simple Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-6">Évolution des ventes</h2>
              
              {/* Simple Bar Chart */}
              <div className="space-y-2">
                {trends.map((day, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">{formatDate(day.date)}</span>
                      <span className="font-semibold text-gray-900">
                        {formatPrice(day.revenue)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-amber-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${(day.revenue / Math.max(...trends.map(t => t.revenue))) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profit Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-6">Évolution du profit</h2>
              
              <div className="space-y-2">
                {trends.map((day, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">{formatDate(day.date)}</span>
                      <span className="font-semibold text-green-600">
                        {formatPrice(day.profit)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${(day.profit / Math.max(...trends.map(t => t.profit))) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}