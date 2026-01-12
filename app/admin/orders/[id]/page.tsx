'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Phone,
  MapPin,
  Calendar,
  Package,
  Clock,
  CheckCircle,

  Truck,
  MessageCircle,

} from 'lucide-react'
import { formatPrice } from '@/lib/constants'
import { formatDate } from '@/lib/utils'
import React from 'react'

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchOrder()
  }, [id])

  const fetchOrder = async () => {
    try {
      // TODO: const res = await fetch(`/api/orders/${params.id}`)
      // const data = await res.json()

      // Mock data
      setOrder({
        id,
        orderNumber: 'CMD-001',
        user: {
          id: 'u1',
          name: 'Marie Ngono',
          phone: '+237 677 88 99 00',
          email: 'marie.ngono@example.com',
        },
        deliveryName: 'Marie Ngono',
        deliveryPhone: '+237 677 88 99 00',
        deliveryAddress: 'Quartier Bastos, Rue 1234',
        deliveryCity: 'Yaoundé',
        deliveryDistrict: 'Bastos',
        deliveryLandmark: 'Près de l\'ambassade de France',
        deliveryInstructions: 'Sonner 2 fois, porte bleue',
        status: 'PENDING',
        paymentStatus: 'PENDING',
        paymentMethod: 'MOBILE_MONEY',
        subtotal: 11000,
        deliveryFee: 1500,
        discount: 0,
        total: 12500,
        items: [
          {
            id: 'i1',
            productName: 'Gâteau au Chocolat Suprême',
            productImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
            quantity: 1,
            price: 8500,
            note: 'Sans noix SVP',
          },
          {
            id: 'i2',
            productName: 'Cupcake Vanille',
            productImage: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400',
            quantity: 2,
            price: 1250,
            note: null,
          },
        ],
        notes: 'Commande pour anniversaire, livraison vers 14h SVP',
        createdAt: new Date().toISOString(),
        scheduledAt: null,
        statusHistory: [
          {
            status: 'PENDING',
            createdAt: new Date().toISOString(),
            note: 'Commande créée',
          },
        ],
      })
      setLoading(false)
    } catch (error) {
      console.error('Erreur chargement commande:', error)
      setLoading(false)
    }
  }

  const updateStatus = async (newStatus: string) => {
    setUpdating(true)
    try {
      // TODO: await fetch(`/api/orders/${params.id}/status`, {
      //   method: 'PATCH',
      //   body: JSON.stringify({ status: newStatus }),
      // })

      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setOrder({ ...order, status: newStatus })
      alert(`Statut mis à jour: ${newStatus}`)
    } catch (error) {
      console.error('Erreur mise à jour:', error)
      alert('Erreur lors de la mise à jour')
    } finally {
      setUpdating(false)
    }
  }

  const sendWhatsAppNotification = () => {
    const message = `Bonjour ${order.deliveryName}, votre commande ${order.orderNumber} est ${getStatusLabel(order.status)}. Total: ${formatPrice(order.total)}`
    const url = `https://wa.me/${order.deliveryPhone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }





  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      PENDING: 'en attente',
      CONFIRMED: 'confirmée',
      PREPARING: 'en préparation',
      READY: 'prête',
      DELIVERED: 'livrée',
      CANCELLED: 'annulée',
    }
    return labels[status] || status
  }

  const statusStyles: Record<string, { current: string; active: string; line: string; button: string }> = {
    yellow: {
      current: 'bg-yellow-600 text-white ring-4 ring-yellow-300',
      active: 'bg-yellow-100 text-yellow-700',
      line: 'bg-yellow-400',
      button: 'bg-yellow-100 text-yellow-700',
    },
    blue: {
      current: 'bg-blue-600 text-white ring-4 ring-blue-300',
      active: 'bg-blue-100 text-blue-700',
      line: 'bg-blue-400',
      button: 'bg-blue-100 text-blue-700',
    },
    purple: {
      current: 'bg-purple-600 text-white ring-4 ring-purple-300',
      active: 'bg-purple-100 text-purple-700',
      line: 'bg-purple-400',
      button: 'bg-purple-100 text-purple-700',
    },
    green: {
      current: 'bg-green-600 text-white ring-4 ring-green-300',
      active: 'bg-green-100 text-green-700',
      line: 'bg-green-400',
      button: 'bg-green-100 text-green-700',
    },
    gray: {
      current: 'bg-gray-600 text-white ring-4 ring-gray-300',
      active: 'bg-gray-100 text-gray-700',
      line: 'bg-gray-400',
      button: 'bg-gray-100 text-gray-700',
    },
  }

  const statusFlow = [
    { value: 'PENDING', label: 'En attente', icon: Clock, color: 'yellow' },
    { value: 'CONFIRMED', label: 'Confirmer', icon: CheckCircle, color: 'blue' },
    { value: 'PREPARING', label: 'Préparer', icon: Package, color: 'purple' },
    { value: 'READY', label: 'Prête', icon: CheckCircle, color: 'green' },
    { value: 'DELIVERED', label: 'Livrée', icon: Truck, color: 'gray' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-500 mb-4">Commande introuvable</p>
        <Link href="/admin/orders" className="text-blue-700 hover:text-blue-800">
          Retour aux commandes
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 lg:top-0 z-30">
        <div className="p-4 md:p-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{order.orderNumber}</h1>
              <p className="text-sm text-gray-600 mt-1">
                Créée le {formatDate(order.createdAt)}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <button
              onClick={sendWhatsAppNotification}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4" />
              Notifier client
            </button>
            <a
              href={`tel:${order.deliveryPhone}`}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
        {/* Status Flow */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4">Statut de la commande</h2>
          
          <div className="flex items-center justify-between mb-6">
            {statusFlow.map((s, index) => {
              const Icon = s.icon
              const isActive = statusFlow.findIndex(sf => sf.value === order.status) >= index
              const isCurrent = s.value === order.status
              
              return (
                <div key={s.value} className="flex flex-wrap gap-1 items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCurrent
                          ? statusStyles[s.color].current
                          : isActive
                          ? statusStyles[s.color].active
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className={`text-xs mt-2 ${isCurrent ? 'font-semibold' : ''}`}>
                      {s.label}
                    </p>
                  </div>
                  {index < statusFlow.length - 1 && (
                    <div
                      className={`h-0.5 w-8 mx-2 ${
                        isActive ? statusStyles[s.color].line : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* Status Actions */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {statusFlow.map((s) => (
              <button
                key={s.value}
                onClick={() => updateStatus(s.value)}
                disabled={updating || order.status === s.value}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  order.status === s.value
                    ? `${statusStyles[s.color].button} cursor-default`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } disabled:opacity-50`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Client Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-gray-900">Informations client</h2>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{order.deliveryName}</p>
              <p className="text-sm text-gray-600">{order.deliveryPhone}</p>
              {order.user?.email && (
                <p className="text-sm text-gray-600">{order.user.email}</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Adresse de livraison</p>
              <p className="text-sm text-gray-700">{order.deliveryAddress}</p>
              <p className="text-sm text-gray-600">
                {order.deliveryDistrict}, {order.deliveryCity}
              </p>
              {order.deliveryLandmark && (
                <p className="text-xs text-gray-500 mt-1">
                  📍 {order.deliveryLandmark}
                </p>
              )}
              {order.deliveryInstructions && (
                <p className="text-xs text-blue-700 mt-1 bg-blue-50 p-2 rounded">
                  💬 {order.deliveryInstructions}
                </p>
              )}
            </div>
          </div>

          {order.scheduledAt && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-purple-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Livraison programmée</p>
                <p className="text-sm text-gray-700">{formatDate(order.scheduledAt)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4">Produits commandés</h2>

          <div className="space-y-3">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex gap-4 pb-3 border-b last:border-0">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{item.productName}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × {formatPrice(item.price)}
                  </p>
                  {item.note && (
                    <p className="text-xs text-blue-700 mt-1 bg-blue-50 px-2 py-1 rounded">
                      Note: {item.note}
                    </p>
                  )}
                </div>
                <p className="font-bold text-gray-900">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4">Récapitulatif</h2>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-gray-700">
              <span>Sous-total</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>

            <div className="flex items-center justify-between text-gray-700">
              <span>Livraison</span>
              <span>
                {order.deliveryFee === 0 ? (
                  <span className="text-green-600 font-semibold">Gratuit</span>
                ) : (
                  formatPrice(order.deliveryFee)
                )}
              </span>
            </div>

            {order.discount > 0 && (
              <div className="flex items-center justify-between text-green-600">
                <span>Réduction</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}

            <div className="pt-3 border-t flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-blue-700">
                {formatPrice(order.total)}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Paiement</span>
              <span className={`font-semibold ${
                order.paymentStatus === 'PAID' ? 'text-green-600' : 'text-orange-600'
              }`}>
                {order.paymentStatus === 'PAID' ? '✓ Payé' : 'En attente'}
                {order.paymentMethod && ` (${order.paymentMethod})`}
              </span>
            </div>
          </div>

          {order.notes && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-700 mb-1">Notes de commande</p>
              <p className="text-sm text-gray-600">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Danger Zone */}
        {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-red-200">
            <h2 className="font-bold text-red-700 mb-2">Zone de danger</h2>
            <p className="text-sm text-gray-600 mb-4">
              Cette action est irréversible
            </p>
            <button
              onClick={() => {
                if (confirm('Êtes-vous sûr de vouloir annuler cette commande ?')) {
                  updateStatus('CANCELLED')
                }
              }}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Annuler la commande
            </button>
          </div>
        )}
      </div>
    </div>
  )
}