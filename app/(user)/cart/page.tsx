'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/Button3'
import { formatPrice } from '@/lib/constants'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  weight?: string
}

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Gâteau au Chocolat Suprême',
      price: 8500,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
      quantity: 1,
      weight: '1 Kg',
    },
    {
      id: '2',
      name: 'Cupcake Vanille "Doux Mariage"',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&q=80',
      quantity: 3,
      weight: '150g/pièce',
    },
    {
      id: '3',
      name: 'Tarte aux Fruits Tropicaux',
      price: 6500,
      image: 'https://images.unsplash.com/photo-1519915212116-715fb0bc3734?w=800&q=80',
      quantity: 1,
      weight: '800g',
    },
  ])

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const clearCart = () => {
    if (confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
      setCartItems([])
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal >= 10000 ? 0 : 1500 
  const total = subtotal + deliveryFee

  const handleSendOrder = () => {
    console.log('Envoi de la commande:', cartItems)
    // TODO: Envoyer via WhatsApp ou autre
    router.push('/checkout')
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-48">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>

          <h1 className="text-xl font-bold text-gray-900">Mon Panier</h1>

          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-red-500 font-semibold hover:text-red-600"
            >
              Vider
            </button>
          )}

          {cartItems.length === 0 && <div className="w-10" />}
        </div>
      </header>

      {/* Content */}
      <div className="px-6 py-6">
        {cartItems.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Votre panier est vide
            </h2>
            <p className="text-gray-500 mb-8 max-w-sm">
              Ajoutez de délicieux produits pour commencer
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push('/home')}
            >
              Découvrir nos produits
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                {cartItems.length} article{cartItems.length > 1 ? 's' : ''} dans le panier
              </p>
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={(delta) => updateQuantity(item.id, delta)}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl p-6 space-y-4 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Résumé de la commande</h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <div>
                    <span>Livraison</span>
                    {deliveryFee === 0 && (
                      <span className="ml-2 text-xs text-green-600 font-semibold">
                        🎉 Gratuit
                      </span>
                    )}
                  </div>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? 'Gratuit' : formatPrice(deliveryFee)}
                  </span>
                </div>

                {deliveryFee > 0 && (
                  <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded-lg">
                    💡 Plus que {formatPrice(10000 - subtotal)} pour la livraison gratuite !
                  </p>
                )}

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-amber-700">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer with Send Order Button */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 safe-bottom z-30">
          <div className="flex items-center gap-4 max-w-7xl mx-auto">
            <div className="flex-1">
              <p className="text-sm text-gray-500">Montant total</p>
              <p className="text-2xl font-bold text-gray-900">{formatPrice(total)}</p>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleSendOrder}
              className="flex-1"
            >
              Commander
            </Button>
          </div>
        </div>
      )}
    </main>
  )
}

// Composant Cart Item
interface CartItemCardProps {
  item: CartItem
  onUpdateQuantity: (delta: number) => void
  onRemove: () => void
}

function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex gap-4">
        {/* Image */}
        <div className="relative w-24 h-24 shrink-0 bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
            {item.weight && (
              <p className="text-sm text-gray-500">{item.weight}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onUpdateQuantity(-1)}
                disabled={item.quantity <= 1}
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center font-bold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="text-lg font-bold text-gray-900 min-w-8 text-center">
                {item.quantity}
              </span>

              <button
                onClick={() => onUpdateQuantity(1)}
                className="w-8 h-8 rounded-lg bg-amber-700 flex items-center justify-center font-bold text-white hover:bg-amber-800 transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Price */}
            <p className="text-lg font-bold text-amber-700">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors group"
        >
          <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
        </button>
      </div>
    </div>
  )
}