// components/admin/products/StockSection.tsx
'use client';

import { Package, AlertTriangle } from 'lucide-react';

interface StockSectionProps {
  formData: {
    stock: string;
    lowStockThreshold: string;
    available: boolean;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function StockSection({ formData, onChange }: StockSectionProps) {
  const stock = parseInt(formData.stock) || 0;
  const threshold = parseInt(formData.lowStockThreshold) || 5;
  const isLowStock = stock > 0 && stock <= threshold;
  const isOutOfStock = stock === 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Gestion du stock</h2>
        <p className="text-sm text-gray-500">
          Gérez l'inventaire et les alertes de stock
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Stock actuel */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Stock actuel
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Package className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={onChange}
              placeholder="10"
              min="0"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all"
            />
          </div>
          {isLowStock && (
            <div className="mt-2 flex items-center gap-2 text-orange-600 text-xs font-medium">
              <AlertTriangle className="w-4 h-4" />
              Stock faible
            </div>
          )}
          {isOutOfStock && (
            <div className="mt-2 flex items-center gap-2 text-red-600 text-xs font-medium">
              <AlertTriangle className="w-4 h-4" />
              Rupture de stock
            </div>
          )}
        </div>

        {/* Seuil d'alerte */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Seuil d'alerte stock
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <AlertTriangle className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="number"
              name="lowStockThreshold"
              value={formData.lowStockThreshold}
              onChange={onChange}
              min="0"
              placeholder="5"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all"
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Alerte quand le stock descend en dessous
          </p>
        </div>
      </div>

      {/* Statut stock visuel */}
      <div className={`p-4 rounded-xl border-2 ${
        isOutOfStock
          ? 'bg-red-50 border-red-200'
          : isLowStock
          ? 'bg-orange-50 border-orange-200'
          : 'bg-green-50 border-green-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${
            isOutOfStock
              ? 'bg-red-500'
              : isLowStock
              ? 'bg-orange-500 animate-pulse'
              : 'bg-green-500'
          }`} />
          <div className="flex-1">
            <p className={`text-sm font-semibold ${
              isOutOfStock
                ? 'text-red-900'
                : isLowStock
                ? 'text-orange-900'
                : 'text-green-900'
            }`}>
              {isOutOfStock
                ? 'Produit en rupture de stock'
                : isLowStock
                ? `Stock faible (${stock} unité${stock > 1 ? 's' : ''})`
                : `Stock disponible (${stock} unité${stock > 1 ? 's' : ''})`
              }
            </p>
            <p className="text-xs text-gray-600 mt-0.5">
              {isOutOfStock
                ? 'Réapprovisionner rapidement'
                : isLowStock
                ? 'Commandez avant épuisement'
                : 'Niveau de stock optimal'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Disponibilité */}
      <div className="pt-4 border-t border-gray-200">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={onChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              Produit disponible à la vente
            </span>
            <p className="text-xs text-gray-500 mt-0.5">
              {formData.available
                ? 'Les clients peuvent commander ce produit'
                : 'Le produit est masqué et non achetable'
              }
            </p>
          </div>
        </label>
      </div>

      {!formData.available && (
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-700 flex items-start gap-2">
            <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Ce produit n'apparaîtra pas dans le catalogue pour les clients. 
              Activez-le pour le rendre visible et achetable.
            </span>
          </p>
        </div>
      )}
    </div>
  );
}