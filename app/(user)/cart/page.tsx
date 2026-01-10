// src/app/cart/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button3';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  weight: string;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Chocolate Cake',
      price: 25,
      image: '/images/chocolate-cake.jpg',
      quantity: 1,
      weight: '0.5 Kg',
    },
    {
      id: '2',
      name: 'Vanilla Cupcake',
      price: 8,
      image: '/images/cupcake.jpg',
      quantity: 2,
      weight: '0.5 Kg',
    },
    {
      id: '3',
      name: 'Strawberry Tart',
      price: 15,
      image: '/images/tart.jpg',
      quantity: 1,
      weight: '1 Kg',
    },
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const clearCart = () => {
    if (confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
      setCartItems([]);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 5;
  const tax = subtotal * 0.1;
  const total = subtotal + deliveryFee + tax;

  const handleCheckout = () => {
    console.log('Checkout with items:', cartItems);
    // TODO: Navigate to checkout page
    router.push('/checkout');
  };

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

          <h1 className="text-xl font-bold text-gray-900">My Cart</h1>

          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-red-500 font-semibold hover:text-red-600"
            >
              Clear
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
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-gray-500 mb-8 max-w-sm">
              Add some delicious items to your cart to get started
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push('/home')}
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="space-y-4">
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
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-amber-700">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>



          </div>
        )}
      </div>

      {/* Footer with Checkout */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 safe-bottom z-30">
          <div className="flex items-center gap-4 max-w-7xl mx-auto">
            <div className="flex-1">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</p>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleCheckout}
              className="flex-1"
            >
              Checkout
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}

// Composant Cart Item
interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (delta: number) => void;
  onRemove: () => void;
}

function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex gap-4">
        {/* Image */}
        <div className="relative w-24 h-24 shrink-0 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.weight}</p>
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
            <p className="text-xl font-bold text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
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
  );
}