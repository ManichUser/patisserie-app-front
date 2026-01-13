// components/admin/offers/OfferModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, Percent, DollarSign } from 'lucide-react';
import { OfferModalProps, OfferFormData } from '@/lib/types';



const offerTypes = [
  { value: 'FLASH_SALE', label: 'Vente Flash', icon: '⚡', description: 'Offre limitée dans le temps' },
  { value: 'BUNDLE', label: 'Pack', icon: '📦', description: 'Plusieurs produits groupés' },
  { value: 'BOGO', label: '1 acheté = 1 offert', icon: '🎁', description: 'Buy One Get One' },
  { value: 'DISCOUNT', label: 'Réduction', icon: '💰', description: 'Prix réduit' },
  { value: 'FREE_DELIVERY', label: 'Livraison gratuite', icon: '🚚', description: 'Frais de port offerts' },
];

export function OfferModal({ isOpen, offer, onClose, onSave }: OfferModalProps) {
  const [formData, setFormData] = useState<OfferFormData>({
    title: '',
    description: '',
    type: 'DISCOUNT',
    badge: '',
    discountType: 'PERCENTAGE',
    discountValue: '',
    minPurchase: '',
    maxDiscount: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    usageLimit: '',
    limitPerUser: '',
    isActive: true,
    productIds: [],
    categoryIds: [],
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (offer) {
      setFormData({
        title: offer.title || '',
        description: offer.description || '',
        type: offer.type || 'DISCOUNT',
        badge: offer.badge || '',
        discountType: offer.discountType || 'PERCENTAGE',
        discountValue: offer.discountValue?.toString() || '',
        minPurchase: offer.minPurchase?.toString() || '',
        maxDiscount: offer.maxDiscount?.toString() || '',
        startDate: offer.startDate?.split('T')[0] || new Date().toISOString().split('T')[0],
        endDate: offer.endDate?.split('T')[0] || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        usageLimit: offer.usageLimit?.toString() || '',
        limitPerUser: offer.limitPerUser?.toString() || '',
        isActive: offer.isActive ?? true,
        productIds: offer.productIds || [],
        categoryIds: offer.categoryIds || [],
      });
    }
  }, [offer, isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Le titre est requis';
    if (!formData.type) newErrors.type = 'Le type est requis';
    if (!formData.discountValue || parseFloat(formData.discountValue) <= 0) {
      newErrors.discountValue = 'La valeur doit être supérieure à 0';
    }
    if (formData.discountType === 'PERCENTAGE' && parseFloat(formData.discountValue) > 100) {
      newErrors.discountValue = 'Le pourcentage ne peut pas dépasser 100%';
    }
    if (!formData.startDate) newErrors.startDate = 'La date de début est requise';
    if (!formData.endDate) newErrors.endDate = 'La date de fin est requise';
    if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = 'La date de fin doit être après la date de début';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving offer:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-xl font-bold text-gray-900">
            {offer ? 'Modifier l\'offre' : 'Nouvelle offre spéciale'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Type d'offre */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Type d'offre <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              {offerTypes.map(type => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: type.value })}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    formData.type === type.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <span className="text-3xl block mb-2">{type.icon}</span>
                  <p className={`text-xs font-semibold ${
                    formData.type === type.value ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {type.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Titre et Description */}
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Titre de l'offre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: -20% sur tous les gâteaux"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                  errors.title
                    ? 'border-red-300 focus:border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                }`}
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Décrivez l'offre..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Badge (optionnel)
              </label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Ex: PROMO, -50%, NOUVEAU"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all"
              />
            </div>
          </div>

          {/* Réduction */}
          <div className="p-5 bg-green-50 rounded-xl border-2 border-green-200">
            <h3 className="font-bold text-gray-900 mb-4">💰 Réduction</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Type de réduction <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, discountType: 'PERCENTAGE' })}
                    className={`py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      formData.discountType === 'PERCENTAGE'
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                    }`}
                  >
                    <Percent className="w-4 h-4" />
                    Pourcentage
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, discountType: 'FIXED_AMOUNT' })}
                    className={`py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      formData.discountType === 'FIXED_AMOUNT'
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                    }`}
                  >
                    <DollarSign className="w-4 h-4" />
                    Montant fixe
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Valeur <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                    placeholder={formData.discountType === 'PERCENTAGE' ? '20' : '5000'}
                    min="0"
                    step={formData.discountType === 'PERCENTAGE' ? '1' : '100'}
                    max={formData.discountType === 'PERCENTAGE' ? '100' : undefined}
                    className={`w-full pl-4 pr-16 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                      errors.discountValue
                        ? 'border-red-300 focus:border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-green-500 hover:border-gray-300'
                    }`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                    {formData.discountType === 'PERCENTAGE' ? '%' : 'FCFA'}
                  </span>
                </div>
                {errors.discountValue && (
                  <p className="mt-2 text-sm text-red-600">{errors.discountValue}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Achat minimum (FCFA)
                </label>
                <input
                  type="number"
                  value={formData.minPurchase}
                  onChange={(e) => setFormData({ ...formData, minPurchase: e.target.value })}
                  placeholder="10000"
                  min="0"
                  step="100"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 hover:border-gray-300 transition-all"
                />
              </div>

              {formData.discountType === 'PERCENTAGE' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Réduction maximale (FCFA)
                  </label>
                  <input
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                    placeholder="20000"
                    min="0"
                    step="100"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 hover:border-gray-300 transition-all"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Période */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              📅 Période de validité
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                      errors.startDate
                        ? 'border-red-300 focus:border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                    }`}
                  />
                </div>
                {errors.startDate && (
                  <p className="mt-2 text-sm text-red-600">{errors.startDate}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Calendar className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                      errors.endDate
                        ? 'border-red-300 focus:border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                    }`}
                  />
                </div>
                {errors.endDate && (
                  <p className="mt-2 text-sm text-red-600">{errors.endDate}</p>
                )}
              </div>
            </div>
          </div>

          {/* Limites */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Limite d'utilisation totale
              </label>
              <input
                type="number"
                value={formData.usageLimit}
                onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                placeholder="Illimité"
                min="0"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Limite par utilisateur
              </label>
              <input
                type="number"
                value={formData.limitPerUser}
                onChange={(e) => setFormData({ ...formData, limitPerUser: e.target.value })}
                placeholder="Illimité"
                min="0"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all"
              />
            </div>
          </div>

          {/* Active */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-600 transition-colors"></div>
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Activer l'offre immédiatement
                </span>
                <p className="text-xs text-gray-500 mt-0.5">
                  L'offre sera visible et applicable par les clients
                </p>
              </div>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Enregistrement...' : offer ? 'Mettre à jour' : 'Créer l\'offre'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}