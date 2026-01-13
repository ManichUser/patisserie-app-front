// components/admin/offers/OfferCard.tsx
'use client';

import { Edit, Trash2, Calendar, Package, Tag, Users, TrendingUp, Copy } from 'lucide-react';
import {OfferCardProps } from '@/lib/types';

const typeLabels: Record<string, { label: string; icon: string; color: string }> = {
  FLASH_SALE: { label: 'Vente Flash', icon: '⚡', color: 'bg-red-100 text-red-700' },
  BUNDLE: { label: 'Pack', icon: '📦', color: 'bg-blue-100 text-blue-700' },
  BOGO: { label: 'Achetez-en 1, obtenez-en 1', icon: '🎁', color: 'bg-purple-100 text-purple-700' },
  DISCOUNT: { label: 'Réduction', icon: '💰', color: 'bg-green-100 text-green-700' },
  FREE_DELIVERY: { label: 'Livraison gratuite', icon: '🚚', color: 'bg-orange-100 text-orange-700' },
};

export function OfferCard({ offer, onEdit, onDelete, onToggleActive, onDuplicate }: OfferCardProps) {
  const typeConfig = typeLabels[offer.type] || typeLabels.DISCOUNT;
  const isExpired = new Date(offer.endDate) < new Date();
  const isUpcoming = new Date(offer.startDate) > new Date();
  
  const usagePercentage = offer.usageLimit 
    ? (offer.usageCount / offer.usageLimit * 100)
    : 0;

  const daysLeft = Math.ceil((new Date(offer.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className={`bg-white rounded-2xl shadow-sm border-2 transition-all hover:shadow-md group ${
      !offer.isActive ? 'opacity-60' : ''
    } ${isExpired ? 'border-red-200' : 'border-gray-100'}`}>
      {/* Image ou Badge */}
      {offer.image ? (
        <div className="relative h-48 rounded-t-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
          <img
            src={offer.image}
            alt={offer.title}
            className="w-full h-full object-cover"
          />
          {offer.badge && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {offer.badge}
            </div>
          )}
        </div>
      ) : (
        <div className="relative h-32 rounded-t-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-6xl">{typeConfig.icon}</span>
          {offer.badge && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {offer.badge}
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${typeConfig.color}`}>
                {typeConfig.label}
              </span>
              {!offer.isActive && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600">
                  Inactive
                </span>
              )}
              {isExpired && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-100 text-red-700">
                  Expirée
                </span>
              )}
              {isUpcoming && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-100 text-blue-700">
                  À venir
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
              {offer.title}
            </h3>
            {offer.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {offer.description}
              </p>
            )}
          </div>
        </div>

        {/* Réduction */}
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl mb-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Réduction</p>
              <p className="text-2xl font-bold text-green-600">
                {offer.discountType === 'PERCENTAGE' 
                  ? `${offer.discountValue}%`
                  : `${offer.discountValue.toLocaleString()} FCFA`
                }
              </p>
            </div>
            {offer.minPurchase && (
              <div className="text-right">
                <p className="text-xs text-gray-600">Min. achat</p>
                <p className="text-sm font-bold text-gray-900">
                  {offer.minPurchase.toLocaleString()} FCFA
                </p>
              </div>
            )}
          </div>
          {offer.maxDiscount && offer.discountType === 'PERCENTAGE' && (
            <p className="text-xs text-gray-600 mt-2">
              Plafond: {offer.maxDiscount.toLocaleString()} FCFA
            </p>
          )}
        </div>

        {/* Dates */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">
              Du {new Date(offer.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
              {' '}au {new Date(offer.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
          {!isExpired && !isUpcoming && daysLeft > 0 && (
            <p className="text-xs text-orange-600 font-medium">
              ⏰ {daysLeft} jour{daysLeft > 1 ? 's' : ''} restant{daysLeft > 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Utilisation */}
        {offer.usageLimit && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Utilisation</span>
              <span className="font-bold text-gray-900">
                {offer.usageCount} / {offer.usageLimit}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  usagePercentage >= 90 ? 'bg-red-500' : usagePercentage >= 70 ? 'bg-orange-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Scope */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
          {offer.productIds.length > 0 && (
            <div className="flex items-center gap-1">
              <Package className="w-4 h-4" />
              <span>{offer.productIds.length} produit{offer.productIds.length > 1 ? 's' : ''}</span>
            </div>
          )}
          {offer.categoryIds.length > 0 && (
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              <span>{offer.categoryIds.length} catégorie{offer.categoryIds.length > 1 ? 's' : ''}</span>
            </div>
          )}
          {offer.productIds.length === 0 && offer.categoryIds.length === 0 && (
            <div className="flex items-center gap-1">
              <span>✨ Tous les produits</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onToggleActive(offer.id)}
            className={`px-4 py-2.5 rounded-xl font-medium transition-all ${
              offer.isActive
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                : 'bg-green-100 hover:bg-green-200 text-green-700'
            }`}
          >
            {offer.isActive ? 'Désactiver' : 'Activer'}
          </button>

          <button
            onClick={() => onEdit(offer)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all"
          >
            <Edit className="w-4 h-4 inline mr-1" />
            Modifier
          </button>

          {onDuplicate && (
            <button
              onClick={() => onDuplicate(offer)}
              className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2.5 rounded-xl font-medium transition-all"
            >
              <Copy className="w-4 h-4 inline mr-1" />
              Dupliquer
            </button>
          )}

          <button
            onClick={() => onDelete(offer.id)}
            className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2.5 rounded-xl font-medium transition-all"
          >
            <Trash2 className="w-4 h-4 inline mr-1" />
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}