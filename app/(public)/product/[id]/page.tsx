// src/app/product/[id]/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star,
  MessageCircle,
  Phone,
  ShoppingCart,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/Button3';

// Types
interface ProductImage {
  id: number;
  url: string;
  alt: string;
}

interface WeightOption {
  value: string;
  label: string;
  price: number;
}

interface Seller {
  name: string;
  role: string;
  avatar: string;
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState('0.5');
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Données du produit (à remplacer par un appel API)
  const product = {
    id: params.id,
    name: 'Chocolate Cake',
    category: 'Cake',
    rating: 4.9,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    images: [
      { id: 1, url: '/images/cake-main.jpg', alt: 'Chocolate Cake' },
      { id: 2, url: '/images/cake-2.jpg', alt: 'Vue 2' },
      { id: 3, url: '/images/cake-3.jpg', alt: 'Vue 3' },
      { id: 4, url: '/images/cake-4.jpg', alt: 'Vue 4' },
      { id: 5, url: '/images/cake-5.jpg', alt: 'Vue 5' },
    ] as ProductImage[],
    seller: {
      name: 'Jenny Wilson',
      role: 'Cook',
      avatar: '/images/seller-avatar.jpg',
    } as Seller,
    weightOptions: [
      { value: '0.5', label: '0.5 Kg', price: 25 },
      { value: '1', label: '1 Kg', price: 45 },
      { value: '1.5', label: '1.5 Kg', price: 65 },
      { value: '2', label: '2 Kg', price: 85 },
      { value: '4', label: '4 Kg', price: 160 },
    ] as WeightOption[],
  };

  const currentPrice = product.weightOptions.find(w => w.value === selectedWeight)?.price || 25;
  const totalPrice = currentPrice * quantity;

  const handleAddToCart = () => {
    console.log('Add to cart:', {
      productId: product.id,
      weight: selectedWeight,
      quantity,
      totalPrice,
    });
    // TODO: Ajouter au panier
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-32">
      {/* Header avec image principale */}
      <div className="relative h-[450px] bg-gradient-to-br from-amber-50 to-orange-50">
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

            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-all active:scale-95">
              <Share2 className="w-6 h-6 text-gray-900" />
            </button>
          </div>
        </div>

        {/* Image principale */}
        <div className="relative w-full h-full flex items-center justify-center p-8">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src={product.images[selectedImage]?.url || '/images/placeholder.jpg'}
              alt={product.images[selectedImage]?.alt || product.name}
              fill
              className="object-contain drop-shadow-2xl"
              priority
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
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
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
            <span className="text-emerald-700 text-xs font-medium">Available</span>
          </div>
        </div>

        {/* Vendeur */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white">
              <Image
                src={product.seller.avatar}
                alt={product.seller.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{product.seller.name}</p>
              <p className="text-sm text-gray-500">{product.seller.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors">
              <MessageCircle className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors">
              <Phone className="w-5 h-5 text-white" />
            </button>
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
              {showFullDescription ? 'Show less' : 'Read more'}
            </button>
          </div>
        </div>

        {/* Sélection du poids */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Select Weight</h2>
          <div className="flex flex-wrap gap-3">
            {product.weightOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedWeight(option.value)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedWeight === option.value
                    ? 'bg-amber-700 text-white shadow-lg shadow-amber-700/30 scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quantité */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Quantity</h2>
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
            <p className="text-sm text-gray-500 mb-1">Total Price</p>
            <p className="text-3xl font-bold text-gray-900">
              ${totalPrice.toFixed(2)}
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleAddToCart}
            className="flex-1 max-w-xs"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </main>
  );
}