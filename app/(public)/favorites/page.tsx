'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Heart, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button3'
import Link from 'next/link'
import { BottomNav } from '@/components/layout/BottomNav'
import { formatPrice } from '@/lib/constants'

interface FavoriteProduct {
  id: string
  name: string
  category: string
  price: number
  image: string
  rating: number
}

export default function FavoritesPage() {
  const router = useRouter()
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([
    {
      id: '1',
      name: 'Gâteau au Chocolat Suprême',
      category: 'Gâteaux',
      price: 8500,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
      rating: 4.9,
    },
    {
      id: '2',
      name: 'Cupcake Vanille "Doux Mariage"',
      category: 'Cupcakes',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&q=80',
      rating: 4.7,
    },
    {
      id: '3',
      name: 'Tarte aux Fruits Tropicaux',
      category: 'Tartes',
      price: 6500,
      image: 'https://images.unsplash.com/photo-1519915212116-715fb0bc3734?w=800&q=80',
      rating: 4.8,
    },
    {
      id: '4',
      name: 'Red Velvet "Cœur de Ndolè"',
      category: 'Gâteaux',
      price: 9500,
      image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80',
      rating: 4.8,
    },
    {
      id: '5',
      name: 'Cheesecake Passion "Saveur Tropicale"',
      category: 'Gâteaux',
      price: 7000,
      image: 'https://images.unsplash.com/photo-1533134242782-0b5e6a1e5fb2?w=800&q=80',
      rating: 4.9,
    },
  ])

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id))
  }

  const removeAllFavorites = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer tous vos favoris ?')) {
      setFavorites([])
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>

          <h1 className="text-xl font-bold text-gray-900">Mes Favoris</h1>

          {favorites.length > 0 && (
            <button
              onClick={removeAllFavorites}
              className="text-sm text-red-500 font-semibold hover:text-red-600"
            >
              Tout effacer
            </button>
          )}
          
          {favorites.length === 0 && <div className="w-10" />}
        </div>
      </header>

      {/* Content */}
      <div className="px-6 py-6">
        {favorites.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Aucun favori
            </h2>
            <p className="text-gray-500 mb-8 max-w-sm">
              Ajoutez vos produits préférés pour les retrouver ici
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
          // Favorites List
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              {favorites.length} produit{favorites.length > 1 ? 's' : ''} favori{favorites.length > 1 ? 's' : ''}
            </p>
            {favorites.map((item) => (
              <FavoriteItem
                key={item.id}
                item={item}
                onRemove={() => removeFavorite(item.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Nav bar */}
      <BottomNav />
    </main>
  )
}

// Composant Item Favori
interface FavoriteItemProps {
  item: FavoriteProduct
  onRemove: () => void
}

function FavoriteItem({ item, onRemove }: FavoriteItemProps) {
  return (
    <Link
      href={`/product/${item.id}`}
      className="group flex gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Image */}
      <div className="relative w-20 h-20 shrink-0 bg-gray-100 rounded-xl overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-amber-700 transition-colors line-clamp-1">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{item.category}</p>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-gray-900">{item.rating}</span>
          </div>
        </div>
      </div>

      {/* Price and Remove */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onRemove()
          }}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors group/remove"
        >
          <Heart className="w-5 h-5 fill-red-500 text-red-500 group-hover/remove:fill-none transition-all" />
        </button>

        <p className="text-base font-bold text-amber-700">{formatPrice(item.price)}</p>
      </div>
    </Link>
  )
}