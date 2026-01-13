// components/admin/expenses/ExpenseModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { X, Upload, Calendar } from 'lucide-react';

interface ExpenseFormData {
  category: string;
  description: string;
  amount: string;
  vendor: string;
  reference: string;
  notes: string;
  isRecurring: boolean;
  frequency: string;
  receiptUrl: string;
  expenseDate: string;
}

interface ExpenseModalProps {
  isOpen: boolean;
  expense?: any;
  onClose: () => void;
  onSave: (data: ExpenseFormData) => Promise<void>;
}

const categories = [
  { value: 'RAW_MATERIALS', label: 'Matières premières', icon: '🥚' },
  { value: 'PACKAGING', label: 'Emballage', icon: '📦' },
  { value: 'DELIVERY', label: 'Livraison', icon: '🚚' },
  { value: 'MARKETING', label: 'Marketing', icon: '📣' },
  { value: 'UTILITIES', label: 'Services publics', icon: '💡' },
  { value: 'RENT', label: 'Loyer', icon: '🏠' },
  { value: 'SALARIES', label: 'Salaires', icon: '💰' },
  { value: 'EQUIPMENT', label: 'Équipement', icon: '🔧' },
  { value: 'MAINTENANCE', label: 'Maintenance', icon: '⚙️' },
  { value: 'INSURANCE', label: 'Assurance', icon: '🛡️' },
  { value: 'TAXES', label: 'Taxes', icon: '📊' },
  { value: 'OTHER', label: 'Autres', icon: '📝' },
];

const frequencies = [
  { value: 'DAILY', label: 'Quotidien' },
  { value: 'WEEKLY', label: 'Hebdomadaire' },
  { value: 'MONTHLY', label: 'Mensuel' },
  { value: 'YEARLY', label: 'Annuel' },
];

export function ExpenseModal({ isOpen, expense, onClose, onSave }: ExpenseModalProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    category: '',
    description: '',
    amount: '',
    vendor: '',
    reference: '',
    notes: '',
    isRecurring: false,
    frequency: 'MONTHLY',
    receiptUrl: '',
    expenseDate: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (expense) {
      setFormData({
        category: expense.category || '',
        description: expense.description || '',
        amount: expense.amount?.toString() || '',
        vendor: expense.vendor || '',
        reference: expense.reference || '',
        notes: expense.notes || '',
        isRecurring: expense.isRecurring || false,
        frequency: expense.frequency || 'MONTHLY',
        receiptUrl: expense.receiptUrl || '',
        expenseDate: expense.expenseDate?.split('T')[0] || new Date().toISOString().split('T')[0],
      });
    } else {
      setFormData({
        category: '',
        description: '',
        amount: '',
        vendor: '',
        reference: '',
        notes: '',
        isRecurring: false,
        frequency: 'MONTHLY',
        receiptUrl: '',
        expenseDate: new Date().toISOString().split('T')[0],
      });
    }
    setErrors({});
  }, [expense, isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.category) newErrors.category = 'La catégorie est requise';
    if (!formData.description.trim()) newErrors.description = 'La description est requise';
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Le montant doit être supérieur à 0';
    }
    if (!formData.expenseDate) newErrors.expenseDate = 'La date est requise';

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
      console.error('Error saving expense:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900">
            {expense ? 'Modifier la dépense' : 'Nouvelle dépense'}
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
          {/* Catégorie */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Catégorie de dépense <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.value })}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.category === cat.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <span className={`text-sm font-semibold ${
                      formData.category === cat.value ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {cat.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            {errors.category && (
              <p className="mt-2 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Ex: Achat farine et sucre"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                errors.description
                  ? 'border-red-300 focus:border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
              }`}
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Montant et Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Montant (FCFA) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="25000"
                  min="0"
                  step="100"
                  className={`w-full pl-4 pr-20 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                    errors.amount
                      ? 'border-red-300 focus:border-red-500 bg-red-50'
                      : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                  }`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                  FCFA
                </span>
              </div>
              {errors.amount && (
                <p className="mt-2 text-sm text-red-600">{errors.amount}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Date de dépense <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={formData.expenseDate}
                  onChange={(e) => setFormData({ ...formData, expenseDate: e.target.value })}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                    errors.expenseDate
                      ? 'border-red-300 focus:border-red-500 bg-red-50'
                      : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                  }`}
                />
              </div>
              {errors.expenseDate && (
                <p className="mt-2 text-sm text-red-600">{errors.expenseDate}</p>
              )}
            </div>
          </div>

          {/* Fournisseur et Référence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Fournisseur
              </label>
              <input
                type="text"
                value={formData.vendor}
                onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                placeholder="Ex: Boulangerie du Coin"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Numéro de référence
              </label>
              <input
                type="text"
                value={formData.reference}
                onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                placeholder="Ex: FACT-2024-001"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all font-mono text-sm"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Notes complémentaires
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              placeholder="Ajoutez des détails supplémentaires..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all resize-none"
            />
          </div>

          {/* Dépense récurrente */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={formData.isRecurring}
                  onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Dépense récurrente
                </span>
                <p className="text-xs text-gray-500 mt-0.5">
                  Cette dépense se répète automatiquement
                </p>
              </div>
            </label>

            {formData.isRecurring && (
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Fréquence
                </label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.25rem',
                  }}
                >
                  {frequencies.map(freq => (
                    <option key={freq.value} value={freq.value}>
                      {freq.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Boutons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
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
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Enregistrement...' : expense ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}