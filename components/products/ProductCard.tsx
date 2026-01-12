'use client'

import { Heart, ShoppingCart, Star, ThumbsUp } from 'lucide-react'
import { useState } from 'react'
import { formatPrice } from '@/lib/constants'
import Link from 'next/link'
import { ProductCardProps } from '@/lib/types'



export function ProductCard({
  id,
  name,
  category,
  price,
  image,
  rating,
  popular = false,
  stock = 0,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAddingToCart(true)
    // Simuler l'ajout au panier
    setTimeout(() => {
      setIsAddingToCart(false)
      // TODO: Implémenter la logique du panier
    }, 600)
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    // TODO: Implémenter la logique des favoris
  }

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
    // TODO: Implémenter la logique des likes
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
      {/* Image Container */}
      <Link href={`/product/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute z-40 top-2 left-2 right-2 flex justify-between items-start">
            {/* Badge Populaire */}
            {popular && (
              <span className="bg-amber-700 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                🔥 Top
              </span>
            )}

            {/* Badge Stock */}
            {stock <= 5 && stock > 0 && (
              <span className="mt-32 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg ml-auto">
                {stock} restant{stock > 1 ? 's' : ''}
              </span>
            )}

            {stock === 0 && (
              <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg ml-auto">
                Épuisé
              </span>
            )}
          </div>

          {/* Bouton Favori */}
          <button
            onClick={handleToggleFavorite}
            className="absolute z-40 top-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
          >
            <Heart
              className={`w-4 h-4 transition-all ${
                isFavorite
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-600 hover:text-red-500'
              }`}
            />
          </button>

          {/* Overlay avec bouton panier au survol (desktop only) */}
          <div className="absolute inset-0 z-30 hidden bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:flex items-center justify-center">
            <button
              onClick={handleAddToCart}
              disabled={stock === 0 || isAddingToCart}
              className={`bg-white text-amber-700 px-6 py-2.5 rounded-xl font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 ${
                stock === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-amber-50 hover:scale-105'
              }`}
            >
              {isAddingToCart ? (
                <>
                  <div className="w-4 h-4 border-2 border-amber-700 border-t-transparent rounded-full animate-spin" />
                  <span>Ajout...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Ajouter</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Link>

      {/* Informations du produit */}
      <div className="p-3">
        <div className="flex items-center justify-between">
          {/* Catégorie */}
          <p className="text-xs text-gray-500 font-medium mb-1">{category}</p>
          {/* Note */}
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-gray-900">{rating}</span>
          </div>
        </div>

        {/* Nom du produit */}
        <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 h-10">
          {name}
        </h3>

        {/* J'aime et Prix */}
        <div className="flex items-center justify-between">
          {/* Bouton J'aime */}
          <button
            onClick={handleToggleLike}
            className="flex items-center gap-1 transition-all hover:scale-110 active:scale-95"
          >
            <ThumbsUp
              className={`w-4 h-4 transition-all ${
                isLiked
                  ? 'fill-pink-600 text-pink-600'
                  : 'text-gray-400 hover:text-pink-600'
              }`}
            />
            <span
              className={`text-xs font-semibold transition-colors ${
                isLiked ? 'text-pink-600' : 'text-gray-500'
              }`}
            >
              J'aime
            </span>
          </button>

          {/* Prix */}
          <div className="text-right">
            <p className="font-bold text-amber-700 text-sm">
              {formatPrice(price)}
            </p>
          </div>
        </div>

        {/* Bouton d'ajout mobile (visible uniquement sur mobile) */}
        <button
          onClick={handleAddToCart}
          disabled={stock === 0 || isAddingToCart}
          className={`w-full mt-3 py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 md:hidden ${
            stock === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-amber-700 text-white hover:bg-amber-800 active:scale-95'
          }`}
        >
          {isAddingToCart ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Ajout...</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>{stock === 0 ? 'Épuisé' : 'Ajouter'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}