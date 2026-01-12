'use client'

import { useState, useEffect } from 'react'
import {
  Search,

  Users,

} from 'lucide-react'
import { Customer } from '@/lib/types'
import CustomerCard from '@/components/admin/CustomerCard'



export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [segmentFilter, setSegmentFilter] = useState('all')
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    regular: 0,
    vip: 0,
    inactive: 0,
  })

  useEffect(() => {
    fetchCustomers()
    fetchStats()
  }, [])

  const fetchCustomers = async () => {
    try {
      // TODO: const res = await fetch('/api/users')
      // const data = await res.json()

      // Mock data
      setCustomers([
        {
          id: '1',
          name: 'Marie Ngono',
          email: 'marie.ngono@example.com',
          phone: '+237 677 88 99 00',
          avatar: null,
          totalOrders: 15,
          totalSpent: 125000,
          lastOrderDate: new Date(Date.now() - 86400000).toISOString(),
          createdAt: new Date(Date.now() - 90 * 86400000).toISOString(),
          loyaltyPoints: 250,
          segment: 'VIP',
        },
        {
          id: '2',
          name: 'Jean Mbida',
          email: 'jean.mbida@example.com',
          phone: '+237 699 11 22 33',
          avatar: null,
          totalOrders: 4,
          totalSpent: 35000,
          lastOrderDate: new Date(Date.now() - 7 * 86400000).toISOString(),
          createdAt: new Date(Date.now() - 60 * 86400000).toISOString(),
          loyaltyPoints: 70,
          segment: 'REGULAR',
        },
        {
          id: '3',
          name: 'Sophie Kamga',
          email: 'sophie.kamga@example.com',
          phone: '+237 655 44 33 22',
          avatar: null,
          totalOrders: 1,
          totalSpent: 8500,
          lastOrderDate: new Date(Date.now() - 3 * 86400000).toISOString(),
          createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
          loyaltyPoints: 17,
          segment: 'NEW',
        },
        {
          id: '4',
          name: 'Paul Nkomo',
          email: 'paul.nkomo@example.com',
          phone: '+237 688 77 66 55',
          avatar: null,
          totalOrders: 8,
          totalSpent: 65000,
          lastOrderDate: new Date(Date.now() - 35 * 86400000).toISOString(),
          createdAt: new Date(Date.now() - 180 * 86400000).toISOString(),
          loyaltyPoints: 130,
          segment: 'INACTIVE',
        },
      ])
      setLoading(false)
    } catch (error) {
      console.error('Erreur chargement clients:', error)
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    // TODO: API call
    setStats({
      total: 89,
      new: 12,
      regular: 45,
      vip: 18,
      inactive: 14,
    })
  }


  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)

    const matchesSegment = segmentFilter === 'all' || customer.segment === segmentFilter

    return matchesSearch && matchesSegment
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
              <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
              <p className="text-sm text-gray-600 mt-1">
                {filteredCustomers.length} client{filteredCustomers.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-gray-700">{stats.total}</p>
              <p className="text-xs text-gray-600">Total</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-blue-700">{stats.new}</p>
              <p className="text-xs text-blue-600">Nouveaux</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-green-700">{stats.regular}</p>
              <p className="text-xs text-green-600">Réguliers</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-blue-700">{stats.vip}</p>
              <p className="text-xs text-blue-600">VIP</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-gray-700">{stats.inactive}</p>
              <p className="text-xs text-gray-600">Inactifs</p>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            <select
              value={segmentFilter}
              onChange={(e) => setSegmentFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
              <option value="all">Tous les segments</option>
              <option value="NEW">Nouveaux</option>
              <option value="REGULAR">Réguliers</option>
              <option value="VIP">VIP</option>
              <option value="INACTIVE">Inactifs</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers List */}
      <div className="p-4 md:p-6">
        {filteredCustomers.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucun client trouvé</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCustomers.map((customer) => (
                        <CustomerCard key={customer.id} customer={customer}  />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}