// components/admin/products/NutritionSection.tsx
'use client';

import { Activity } from 'lucide-react';

interface NutritionSectionProps {
  formData: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function NutritionSection({ formData, onChange }: NutritionSectionProps) {
  const hasAnyValue = formData.calories || formData.protein || formData.carbs || formData.fat;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
          <Activity className="w-5 h-5 text-gray-500" />
          Informations nutritionnelles
        </h2>
        <p className="text-sm text-gray-500">
          Optionnel - Pour 100g ou une portion
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Calories */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Calories
          </label>
          <div className="relative">
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={onChange}
              placeholder="350"
              min="0"
              className="w-full px-4 py-3 pr-16 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500">
              kcal
            </span>
          </div>
        </div>

        {/* Protéines */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Protéines
          </label>
          <div className="relative">
            <input
              type="number"
              name="protein"
              value={formData.protein}
              onChange={onChange}
              placeholder="5"
              min="0"
              step="0.1"
              className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500">
              g
            </span>
          </div>
        </div>

        {/* Glucides */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Glucides
          </label>
          <div className="relative">
            <input
              type="number"
              name="carbs"
              value={formData.carbs}
              onChange={onChange}
              placeholder="45"
              min="0"
              step="0.1"
              className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500">
              g
            </span>
          </div>
        </div>

        {/* Lipides */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Lipides
          </label>
          <div className="relative">
            <input
              type="number"
              name="fat"
              value={formData.fat}
              onChange={onChange}
              placeholder="15"
              min="0"
              step="0.1"
              className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500">
              g
            </span>
          </div>
        </div>
      </div>

      {/* Visualisation des macros */}
      {hasAnyValue && (
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <p className="text-sm font-semibold text-gray-900 mb-3">
            Répartition des macronutriments
          </p>
          <div className="space-y-2">
            {formData.protein && (
              <div className="flex items-center gap-3">
                <div className="w-24 text-xs font-medium text-gray-600">Protéines</div>
                <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500"
                    style={{ width: `${Math.min(parseFloat(formData.protein) * 2, 100)}%` }}
                  />
                </div>
                <div className="w-16 text-right text-sm font-bold text-gray-900">
                  {formData.protein}g
                </div>
              </div>
            )}
            {formData.carbs && (
              <div className="flex items-center gap-3">
                <div className="w-24 text-xs font-medium text-gray-600">Glucides</div>
                <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500"
                    style={{ width: `${Math.min(parseFloat(formData.carbs) * 2, 100)}%` }}
                  />
                </div>
                <div className="w-16 text-right text-sm font-bold text-gray-900">
                  {formData.carbs}g
                </div>
              </div>
            )}
            {formData.fat && (
              <div className="flex items-center gap-3">
                <div className="w-24 text-xs font-medium text-gray-600">Lipides</div>
                <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500"
                    style={{ width: `${Math.min(parseFloat(formData.fat) * 2, 100)}%` }}
                  />
                </div>
                <div className="w-16 text-right text-sm font-bold text-gray-900">
                  {formData.fat}g
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {!hasAnyValue && (
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 flex items-start gap-2">
            <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Les informations nutritionnelles sont optionnelles mais recommandées 
              pour une meilleure transparence avec vos clients.
            </span>
          </p>
        </div>
      )}
    </div>
  );
}