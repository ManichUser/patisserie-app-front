'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star,
  MessageCircle,
  Phone,
  ShoppingCart,
} from 'lucide-react'
import { Button } from '@/components/ui/Button3'
import { formatPrice } from '@/lib/constants'
import React from 'react'

// Types
interface ProductImage {
  id: number
  url: string
  alt: string
}

interface SizeOption {
  value: string
  label: string
  price: number
}

interface Seller {
  name: string
  role: string
  avatar: string
  phone: string
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('medium')
  const [quantity, setQuantity] = useState(1)
  const [showFullDescription, setShowFullDescription] = useState(false)

  // Données du produit (à remplacer par un appel API)
  const product = {
    id: React.use(params) ,
    name: 'Gâteau au Chocolat Suprême',
    category: 'Gâteaux',
    rating: 4.9,
    description: 'Notre fameux gâteau au chocolat, moelleux comme du beurre de karité ! Préparé avec du chocolat noir de qualité supérieure et des ingrédients frais. Parfait pour vos cérémonies, anniversaires et événements spéciaux. Un délice qui ravira vos papilles et celles de vos invités. Fait avec amour dans notre pâtisserie à Yaoundé.',
    images: [
      { id: 1, url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80', alt: 'Gâteau Chocolat' },
      { id: 2, url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80', alt: 'Vue 2' },
      { id: 3, url: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80', alt: 'Vue 3' },
      { id: 4, url: 'https://images.unsplash.com/photo-1588195538326-c5acd4628c1d?w=800&q=80', alt: 'Vue 4' },
    ] as ProductImage[],
    seller: {
      name: 'Chef Marie Nguema',
      role: 'Pâtissière',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      phone: '+237 6 77 88 99 00',
    } as Seller,
    sizeOptions: [
      { value: 'small', label: 'Petit (6 pers)', price: 5500 },
      { value: 'medium', label: 'Moyen (12 pers)', price: 8500 },
      { value: 'large', label: 'Grand (20 pers)', price: 15000 },
      { value: 'xlarge', label: 'XL (30 pers)', price: 22000 },
    ] as SizeOption[],
    stock: 12,
  }

  const currentPrice = product.sizeOptions.find(s => s.value === selectedSize)?.price || 8500
  const totalPrice = currentPrice * quantity

  const handleAddToCart = () => {
    console.log('Ajouter au panier:', {
      productId: product.id,
      size: selectedSize,
      quantity,
      totalPrice,
    })
    // TODO: Ajouter au panier
    alert('Produit ajouté au panier ! 🎉')
  }

  const handleWhatsAppContact = () => {
    const message = `Bonjour, je suis intéressé par le ${product.name}`
    const url = `https://wa.me/${product.seller.phone.replace(/\s/g, '')}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Découvrez ce délicieux ${product.name} !`,
        url: window.location.href,
      })
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-32">
      {/* Header avec image principale */}
      <div className="relative h-112.5 bg-linear-to-br from-amber-50 to-orange-50">
        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 safe-top">
          <button
            onClick={() => router.back()}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-all active:scale-95"
            >
              <Heart
                className={`w-6 h-6 transition-colors ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-900'
                }`}
              />
            </button>

            <button
              onClick={handleShare}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-all active:scale-95"
            >
              <Share2 className="w-6 h-6 text-gray-900" />
            </button>
          </div>
        </div>

        {/* Image principale */}
        <div className=" relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 top-0 left-0 right-0 w-full aspect-square">
            <img
              src={product.images[selectedImage]?.url || '/logo.png'}
              alt={product.images[selectedImage]?.alt || product.name}
              className="w-full h-full  object-cover drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Galerie miniatures */}
        <div className="absolute bottom-6 left-0 right-0 px-4">
          <div className="flex items-center justify-center gap-2 bg-black/30 backdrop-blur-md rounded-2xl p-2 max-w-fit mx-auto">
            {product.images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(index)}
                className={`relative w-16 h-16 rounded-xl overflow-hidden transition-all ${
                  selectedImage === index
                    ? 'ring-3 ring-white scale-110'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                {selectedImage === index && (
                  <div className="absolute inset-0 bg-white/20" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="bg-white rounded-t-[32px] -mt-8 relative z-10 px-6 pt-6 pb-8 space-y-6">
        {/* Catégorie et Note */}
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm font-medium">{product.category}</span>
          <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span className="text-amber-700 font-semibold text-sm">{product.rating}</span>
          </div>
        </div>

        {/* Nom du produit */}
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          
          {/* Badge de disponibilité */}
          <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full flex-shrink-0">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-700 text-xs font-medium">
              {product.stock} en stock
            </span>
          </div>
        </div>

        {/* Vendeur */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white">
              <img
                src={product.seller.avatar}
                alt={product.seller.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{product.seller.name}</p>
              <p className="text-sm text-gray-500">{product.seller.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleWhatsAppContact}
              className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
              title="Contacter via WhatsApp"
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </button>
            <a 
              href={`tel:${product.seller.phone}`}
              className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors"
              title="Appeler"
            >
              <Phone className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">Description</h2>
          <div className="relative">
            <p className={`text-gray-600 leading-relaxed ${!showFullDescription && 'line-clamp-3'}`}>
              {product.description}
            </p>
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-amber-700 font-semibold text-sm mt-1 hover:text-amber-800"
            >
              {showFullDescription ? 'Voir moins' : 'Lire la suite'}
            </button>
          </div>
        </div>

        {/* Sélection de la taille */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Choisir la taille</h2>
          <div className="grid grid-cols-2 gap-3">
            {product.sizeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedSize(option.value)}
                className={`p-4 rounded-xl font-semibold transition-all text-left ${
                  selectedSize === option.value
                    ? 'bg-amber-700 text-white shadow-lg shadow-amber-700/30 scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-sm mb-1">{option.label}</div>
                <div className="text-lg font-bold">{formatPrice(option.price)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Quantité */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Quantité</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              -
            </button>
            <span className="text-2xl font-bold text-gray-900 min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-12 rounded-full bg-amber-700 flex items-center justify-center font-bold text-xl text-white hover:bg-amber-800 transition-all active:scale-95"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Footer avec prix et bouton */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 safe-bottom z-30">
        <div className="flex items-center justify-between gap-4 max-w-screen-xl mx-auto">
          <div>
            <p className="text-sm text-gray-500 mb-1">Prix Total</p>
            <p className="text-2xl font-bold text-amber-700">
              {formatPrice(totalPrice)}
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleAddToCart}
            className="flex-1 max-w-xs flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Ajouter au panier
          </Button>
        </div>
      </div>
    </main>
  )
}