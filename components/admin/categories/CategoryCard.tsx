// components/admin/categories/CategoryCard.tsx
'use client';

import { Edit, Trash2, Eye, EyeOff, Package } from 'lucide-react';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  order: number;
  isActive: boolean;
  _count?: {
    products: number;
  };
}

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
}

export function CategoryCard({
  category,
  onEdit,
  onDelete,
  onToggleActive,
}: CategoryCardProps) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border ${category.isActive ? 'border-gray-200' : 'border-gray-300 opacity-60'} hover:shadow-md transition-all group`}>
      {/* Header avec image/icône */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0">
          {category.image ? (
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
            />
          ) : category.icon ? (
            <span className="text-3xl">{category.icon}</span>
          ) : (
            <Package className="w-8 h-8 text-white" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {category.name}
            </h3>
            <span className={`px-2 py-1 rounded-lg text-xs font-medium shrink-0 ${category.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
              {category.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          
          <p className="text-sm text-gray-500 truncate">
            /{category.slug}
          </p>
        </div>
      </div>

      {/* Description */}
      {category.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {category.description}
        </p>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-xl">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">
            <span className="font-semibold">{category._count?.products || 0}</span> produit{(category._count?.products || 0) > 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          <span className="text-sm text-gray-700">
            Ordre: <span className="font-semibold">{category.order}</span>
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onToggleActive(category.id)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          title={category.isActive ? 'Désactiver' : 'Activer'}
        >
          {category.isActive ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
          <span className="text-sm">{category.isActive ? 'Masquer' : 'Afficher'}</span>
        </button>

        <button
          onClick={() => onEdit(category)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center"
          title="Modifier"
        >
          <Edit className="w-4 h-4" />
        </button>

        <button
          onClick={() => onDelete(category.id)}
          className="bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center"
          title="Supprimer"
          disabled={!category.isActive && (category._count?.products || 0) > 0}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}