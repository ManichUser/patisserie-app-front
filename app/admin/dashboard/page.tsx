// app/admin/dashboard/page.tsx
'use client';

import { DollarSign, BarChart3, ShoppingCart, Users, Package, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// Composants modulaires
import { StatCard } from '@/components/admin/dashboard/StatCard';
import { RecommendationCard } from '@/components/admin/dashboard/RecommendationCard';
import { OrderCard } from '@/components/admin/dashboard/OrderCard';
import { QuickAction } from '@/components/admin/dashboard/QuickAction';

// Hook personnalisé
import { useDashboard } from '@/hooks/useDashboard';

export default function AdminDashboard() {
  const { stats, recentOrders, recommendations, loading, formatPrice } = useDashboard();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Erreur de chargement</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-blue-700 text-white sticky top-0 z-20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
          <p className="text-blue-100">Vue d'ensemble de votre boutique</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Stats Cards */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">📊 Statistiques clés</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="Revenu"
                value={formatPrice(stats.revenue.current)}
                icon={DollarSign}
                iconColor="text-green-600"
                iconBg="bg-green-100"
                trend={{
                  value: stats.revenue.change,
                  isPositive: stats.revenue.change >= 0,
                }}
              />

              <StatCard
                label="Profit"
                value={formatPrice(stats.profit.current)}
                icon={BarChart3}
                iconColor="text-blue-600"
                iconBg="bg-blue-100"
                trend={{
                  value: stats.profit.change,
                  isPositive: stats.profit.change >= 0,
                }}
              />

              <StatCard
                label="Commandes"
                value={stats.orders.current}
                icon={ShoppingCart}
                iconColor="text-purple-600"
                iconBg="bg-purple-100"
                trend={{
                  value: stats.orders.change,
                  isPositive: stats.orders.change >= 0,
                }}
              />

              <StatCard
                label="Clients"
                value={stats.customers.current}
                icon={Users}
                iconColor="text-orange-600"
                iconBg="bg-orange-100"
                trend={{
                  value: stats.customers.change,
                  isPositive: stats.customers.change >= 0,
                }}
              />
            </div>
          </div>

          {/* Recommandations */}
          {recommendations.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-5 border-b bg-linear-to-r from-blue-50 to-indigo-50 flex items-center justify-between">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  Recommandations ({recommendations.length})
                </h2>
                <Link
                  href="/admin/recommendations"
                  className="text-sm text-blue-700 hover:text-blue-800 font-semibold transition-colors"
                >
                  Voir tout →
                </Link>
              </div>
              <div className="divide-y">
                {recommendations.map((rec) => (
                  <RecommendationCard key={rec.id} recommendation={rec} />
                ))}
              </div>
            </div>
          )}

          {/* Commandes récentes */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <div className="p-5 border-b flex items-center justify-between">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-purple-600" />
                Commandes récentes
              </h2>
              <Link
                href="/admin/orders"
                className="text-sm text-blue-700 hover:text-blue-800 font-semibold transition-colors"
              >
                Voir tout →
              </Link>
            </div>
            <div className="divide-y">
              {recentOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>

          {/* Actions rapides */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">⚡ Actions rapides</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickAction
                href="/admin/products/new"
                icon={Package}
                label="Nouveau produit"
                iconColor="text-amber-700"
                iconBg="bg-amber-100"
              />

              <QuickAction
                href="/admin/orders"
                icon={ShoppingCart}
                label="Commandes"
                iconColor="text-purple-700"
                iconBg="bg-purple-100"
              />

              <QuickAction
                href="/admin/accounting"
                icon={BarChart3}
                label="Comptabilité"
                iconColor="text-green-700"
                iconBg="bg-green-100"
              />

              <QuickAction
                href="/admin/customers"
                icon={Users}
                label="Clients"
                iconColor="text-blue-700"
                iconBg="bg-blue-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}