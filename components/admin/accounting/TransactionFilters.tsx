// components/admin/accounting/TransactionFilters.tsx
'use client';

import { X } from 'lucide-react';

interface TransactionFiltersProps {
  filters: {
    type: string;
    search: string;
    dateFrom: string;
    dateTo: string;
    minAmount: string;
    maxAmount: string;
    category: string;
  };
  onFiltersChange: (filters: any) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export function TransactionFilters({
  filters,
  onFiltersChange,
  onReset,
  hasActiveFilters,
}: TransactionFiltersProps) {
  const categories = [
    'Gâteaux',
    'Cupcakes',
    'Tartes',
    'Vente directe',
    'Matières premières',
    'Livraison',
    'Marketing',
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-900 mb-4">🔍 Filtres</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => onFiltersChange({ ...filters, type: e.target.value })}
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
          >
            <option value="all">Toutes</option>
            <option value="SALE">Ventes uniquement</option>
            <option value="EXPENSE">Dépenses uniquement</option>
          </select>
        </div>

        {/* Recherche */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Recherche
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            placeholder="Description..."
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>

        {/* Date début */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Date début
          </label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value })}
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>

        {/* Date fin */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Date fin
          </label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value })}
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Montant */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Montant minimum (FCFA)
          </label>
          <input
            type="number"
            value={filters.minAmount}
            onChange={(e) => onFiltersChange({ ...filters, minAmount: e.target.value })}
            placeholder="0"
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Montant maximum (FCFA)
          </label>
          <input
            type="number"
            value={filters.maxAmount}
            onChange={(e) => onFiltersChange({ ...filters, maxAmount: e.target.value })}
            placeholder="Illimité"
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Catégorie
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm"
          >
            <option value="">Toutes les catégories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={onReset}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors text-sm"
        >
          Réinitialiser
        </button>
        
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Filtres actifs:</span>
            {filters.type !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                Type: {filters.type === 'SALE' ? 'Ventes' : 'Dépenses'}
                <button onClick={() => onFiltersChange({ ...filters, type: 'all' })}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.search && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                Recherche: {filters.search}
                <button onClick={() => onFiltersChange({ ...filters, search: '' })}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.category && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                Catégorie: {filters.category}
                <button onClick={() => onFiltersChange({ ...filters, category: '' })}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}