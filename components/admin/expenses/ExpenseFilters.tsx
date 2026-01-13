// components/admin/expenses/ExpenseFilters.tsx
'use client';

import { Search, Filter, X, Calendar } from 'lucide-react';

interface ExpenseFiltersProps {
  filters: {
    search: string;
    category: string;
    isRecurring: string;
    dateFrom: string;
    dateTo: string;
  };
  onFiltersChange: (filters: any) => void;
  onReset: () => void;
}

const categories = [
  { value: '', label: 'Toutes les catégories' },
  { value: 'RAW_MATERIALS', label: '🥚 Matières premières' },
  { value: 'PACKAGING', label: '📦 Emballage' },
  { value: 'DELIVERY', label: '🚚 Livraison' },
  { value: 'MARKETING', label: '📣 Marketing' },
  { value: 'UTILITIES', label: '💡 Services publics' },
  { value: 'RENT', label: '🏠 Loyer' },
  { value: 'SALARIES', label: '💰 Salaires' },
  { value: 'EQUIPMENT', label: '🔧 Équipement' },
  { value: 'MAINTENANCE', label: '⚙️ Maintenance' },
  { value: 'INSURANCE', label: '🛡️ Assurance' },
  { value: 'TAXES', label: '📊 Taxes' },
  { value: 'OTHER', label: '📝 Autres' },
];

export function ExpenseFilters({ filters, onFiltersChange, onReset }: ExpenseFiltersProps) {
  const hasActiveFilters = 
    filters.category || 
    filters.isRecurring || 
    filters.dateFrom || 
    filters.dateTo ||
    filters.search;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-bold text-gray-900">Filtres</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            <X className="w-4 h-4" />
            Réinitialiser
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Recherche */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Recherche
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              placeholder="Description, fournisseur, référence..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all"
            />
          </div>
        </div>

        {/* Catégorie */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Catégorie
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all appearance-none bg-white"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1.25rem',
            }}
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Type de dépense */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Type de dépense
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: '', label: 'Toutes' },
              { value: 'false', label: 'Ponctuelle' },
              { value: 'true', label: 'Récurrente' },
            ].map(type => (
              <button
                key={type.value}
                onClick={() => onFiltersChange({ ...filters, isRecurring: type.value })}
                className={`py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${
                  filters.isRecurring === type.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Période */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Période
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Calendar className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all text-sm"
                  placeholder="Du"
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Calendar className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all text-sm"
                  placeholder="Au"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filtres actifs */}
        {hasActiveFilters && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-900 mb-2">Filtres actifs</p>
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                  Recherche: {filters.search}
                  <button
                    onClick={() => onFiltersChange({ ...filters, search: '' })}
                    className="hover:bg-blue-200 rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.category && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  {categories.find(c => c.value === filters.category)?.label}
                  <button
                    onClick={() => onFiltersChange({ ...filters, category: '' })}
                    className="hover:bg-green-200 rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.isRecurring && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                  {filters.isRecurring === 'true' ? 'Récurrente' : 'Ponctuelle'}
                  <button
                    onClick={() => onFiltersChange({ ...filters, isRecurring: '' })}
                    className="hover:bg-purple-200 rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {(filters.dateFrom || filters.dateTo) && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                  Période: {filters.dateFrom || '...'} - {filters.dateTo || '...'}
                  <button
                    onClick={() => onFiltersChange({ ...filters, dateFrom: '', dateTo: '' })}
                    className="hover:bg-orange-200 rounded"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}