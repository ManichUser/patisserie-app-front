// src/components/products/ProductCardHorizontal.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, Plus } from 'lucide-react';
import { clsx } from 'clsx';

interface ProductCardHorizontalProps {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  description?: string;
  className?: string;
}

export const ProductCardHorizontal: React.FC<ProductCardHorizontalProps> = ({
  id,
  name,
  category,
  price,
  image,
  rating,
  description,
  className,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link
      href={`/product/${id}`}
      className={clsx(
        'group flex gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300',
        className
      )}
    >
      {/* Image */}
      <div className="relative w-24 h-24 flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Rating badge */}
        <div className="absolute bottom-1.5 left-1.5">
          <div className="flex items-center gap-0.5 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded-md shadow-sm">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-gray-900">{rating}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <p className="text-xs text-gray-500 font-medium mb-0.5">{category}</p>
          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-amber-700 transition-colors line-clamp-1">
            {name}
          </h3>
          {description && (
            <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">${price}</p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleFavoriteClick}
              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-all active:scale-95"
            >
              <Heart
                className={clsx(
                  'w-4 h-4 transition-all',
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                )}
              />
            </button>
            
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="w-8 h-8 bg-amber-700 rounded-lg flex items-center justify-center text-white hover:bg-amber-800 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};