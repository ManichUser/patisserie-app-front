'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  DollarSign,
  Tag,
  AlertCircle,
  Grid3x3,
  LogOut,
  Bell,
  Home
} from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: 'Tableau de bord', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Produits', href: '/admin/products', icon: Package },
    { name: 'Catégories', href: '/admin/categories', icon: Grid3x3 },
    { name: 'Commandes', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Ventes', href: '/admin/sales', icon: BarChart3 },
    { name: 'Dépenses', href: '/admin/expenses', icon: DollarSign },
    { name: 'Offres spéciales', href: '/admin/special-offers', icon: Tag },
    { name: 'Clients', href: '/admin/customers', icon: Users },
    { name: 'Recommandations', href: '/admin/recommendations', icon: AlertCircle },
    { name: 'Paramètres', href: '/admin/settings', icon: Settings },
    { name: 'Home', href: '/home', icon: Home },
  ]

  const isActive = (href: string) => {
    return pathname?.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🍰</span>
              </div>
              <span className="font-bold text-gray-900">Admin</span>
            </Link>
          </div>

          <button className="relative p-2 rounded-lg hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 bg-white border-r z-40">
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-700 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🍰</span>
              </div>
              <div>
                <p className="font-bold text-gray-900">Force des Saveurs</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        active
                          ? 'bg-amber-50 text-amber-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${active ? 'text-amber-700' : 'text-gray-500'}`} />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700">
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      {sidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar */}
          <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-white z-50 transform transition-transform">
            <div className="h-full flex flex-col">
              {/* Logo */}
              <div className="p-6 border-b">
                <Link href="/admin/dashboard" className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-700 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🍰</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Force des Saveurs</p>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                </Link>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href)
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            active
                              ? 'bg-amber-50 text-amber-700 font-semibold'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${active ? 'text-amber-700' : 'text-gray-500'}`} />
                          <span className="text-sm">{item.name}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              {/* User Profile */}
              <div className="p-4 border-t">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium text-gray-700">
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  )
}