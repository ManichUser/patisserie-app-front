// components/admin/accounting/ManualSaleModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, DollarSign, Package } from 'lucide-react';

interface ManualSaleFormData {
  customerName: string;
  customerPhone: string;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    costPrice: number;
  }>;
  paymentMethod: string;
  saleDate: string;
  notes: string;
}

interface ManualSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ManualSaleFormData) => Promise<void>;
}

export function ManualSaleModal({ isOpen, onClose, onSave }: ManualSaleModalProps) {
  const [formData, setFormData] = useState<ManualSaleFormData>({
    customerName: '',
    customerPhone: '',
    items: [{ description: '', quantity: 1, unitPrice: 0, costPrice: 0 }],
    paymentMethod: 'CASH',
    saleDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isOpen) {
      // Reset form when closing
      setFormData({
        customerName: '',
        customerPhone: '',
        items: [{ description: '', quantity: 1, unitPrice: 0, costPrice: 0 }],
        paymentMethod: 'CASH',
        saleDate: new Date().toISOString().split('T')[0],
        notes: '',
      });
      setErrors({});
    }
  }, [isOpen]);

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, unitPrice: 0, costPrice: 0 }],
    });
  };

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  };

  const calculateProfit = () => {
    return formData.items.reduce((sum, item) => 
      sum + ((item.unitPrice - item.costPrice) * item.quantity), 0
    );
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Le nom du client est requis';
    }

    if (formData.items.length === 0) {
      newErrors.items = 'Ajoutez au moins un article';
    }

    formData.items.forEach((item, index) => {
      if (!item.description.trim()) {
        newErrors[`item_${index}_description`] = 'Description requise';
      }
      if (item.unitPrice <= 0) {
        newErrors[`item_${index}_unitPrice`] = 'Prix invalide';
      }
    });

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
      console.error('Error saving manual sale:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const total = calculateTotal();
  const profit = calculateProfit();
  const profitMargin = total > 0 ? (profit / total * 100) : 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-xl font-bold text-gray-900">
            Enregistrer une vente manuelle
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Informations client */}
          <div className="bg-blue-50 rounded-xl p-5 border-2 border-blue-200">
            <h3 className="font-bold text-gray-900 mb-4">👤 Informations client</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Nom du client <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="Ex: Marie Ngono"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                    errors.customerName
                      ? 'border-red-300 focus:border-red-500 bg-red-50'
                      : 'border-gray-200 focus:border-blue-500 hover:border-gray-300 bg-white'
                  }`}
                />
                {errors.customerName && (
                  <p className="mt-2 text-sm text-red-600">{errors.customerName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Téléphone (optionnel)
                </label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  placeholder="+237 6XX XXX XXX"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all bg-white"
                />
              </div>
            </div>
          </div>

          {/* Articles */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">📦 Articles vendus</h3>
              <button
                type="button"
                onClick={addItem}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                + Ajouter un article
              </button>
            </div>

            <div className="space-y-3">
              {formData.items.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    <div className="md:col-span-4">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        placeholder="Ex: Gâteau chocolat"
                        className={`w-full px-3 py-2 border-2 rounded-lg text-sm ${
                          errors[`item_${index}_description`]
                            ? 'border-red-300'
                            : 'border-gray-300 focus:border-blue-500'
                        }`}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Qté
                      </label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                        min="1"
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm focus:border-blue-500"
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Prix unitaire (FCFA)
                      </label>
                      <input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="100"
                        className={`w-full px-3 py-2 border-2 rounded-lg text-sm ${
                          errors[`item_${index}_unitPrice`]
                            ? 'border-red-300'
                            : 'border-gray-300 focus:border-blue-500'
                        }`}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Coût
                      </label>
                      <input
                        type="number"
                        value={item.costPrice}
                        onChange={(e) => updateItem(index, 'costPrice', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="100"
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm focus:border-blue-500"
                      />
                    </div>

                    <div className="md:col-span-1 flex items-end">
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="w-full px-2 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4 mx-auto" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-gray-600">
                    Sous-total: <span className="font-semibold">{(item.unitPrice * item.quantity).toLocaleString()} FCFA</span>
                    {item.costPrice > 0 && (
                      <span className="ml-4 text-green-600">
                        Profit: <span className="font-semibold">{((item.unitPrice - item.costPrice) * item.quantity).toLocaleString()} FCFA</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Récapitulatif */}
          <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total vente</p>
                <p className="text-2xl font-bold text-gray-900">
                  {total.toLocaleString()} <span className="text-sm">FCFA</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Profit brut</p>
                <p className="text-2xl font-bold text-green-600">
                  {profit.toLocaleString()} <span className="text-sm">FCFA</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Marge</p>
                <p className={`text-2xl font-bold ${
                  profitMargin >= 40 ? 'text-green-600' : profitMargin >= 25 ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {profitMargin.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          {/* Détails paiement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Méthode de paiement
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all appearance-none bg-white"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.25rem',
                }}
              >
                <option value="CASH">💵 Espèces</option>
                <option value="MOBILE_MONEY">📱 Mobile Money</option>
                <option value="CARD">💳 Carte bancaire</option>
                <option value="BANK_TRANSFER">🏦 Virement bancaire</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Date de la vente
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.saleDate}
                  onChange={(e) => setFormData({ ...formData, saleDate: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Notes (optionnel)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              placeholder="Ajoutez des notes sur cette vente..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all resize-none"
            />
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
              {loading ? 'Enregistrement...' : 'Enregistrer la vente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}