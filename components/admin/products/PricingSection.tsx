// components/admin/products/PricingSection.tsx
'use client';

import { TrendingUp } from 'lucide-react';

interface PricingSectionProps {
  formData: {
    price: string;
    compareAtPrice: string;
    costPrice: string;
  };
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PricingSection({ formData, errors, onChange }: PricingSectionProps) {
  const calculateMargin = () => {
    const price = parseFloat(formData.price);
    const cost = parseFloat(formData.costPrice);
    
    if (price && cost && price > 0) {
      return ((price - cost) / price * 100).toFixed(1);
    }
    return null;
  };

  const calculateDiscount = () => {
    const price = parseFloat(formData.price);
    const compareAt = parseFloat(formData.compareAtPrice);
    
    if (price && compareAt && compareAt > price) {
      return ((compareAt - price) / compareAt * 100).toFixed(0);
    }
    return null;
  };

  const margin = calculateMargin();
  const discount = calculateDiscount();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Tarification</h2>
        <p className="text-sm text-gray-500">
          Définissez vos prix et calculez vos marges
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Prix de vente */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Prix de vente <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={onChange}
              placeholder="8500"
              min="0"
              step="100"
              className={`w-full pl-4 pr-20 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                errors.price
                  ? 'border-red-300 focus:border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
              }`}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
              FCFA
            </span>
          </div>
          {errors.price && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.price}
            </p>
          )}
        </div>

        {/* Prix barré */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Prix barré
          </label>
          <div className="relative">
            <input
              type="number"
              name="compareAtPrice"
              value={formData.compareAtPrice}
              onChange={onChange}
              placeholder="10000"
              min="0"
              step="100"
              className="w-full pl-4 pr-20 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
              FCFA
            </span>
          </div>
          {discount && (
            <p className="mt-2 text-xs text-green-600 font-semibold">
              💰 Réduction de {discount}%
            </p>
          )}
        </div>

        {/* Coût de revient */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Coût de revient
          </label>
          <div className="relative">
            <input
              type="number"
              name="costPrice"
              value={formData.costPrice}
              onChange={onChange}
              placeholder="4000"
              min="0"
              step="100"
              className="w-full pl-4 pr-20 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
              FCFA
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Pour calculer votre marge
          </p>
        </div>
      </div>

      {/* Calcul de marge */}
      {margin && (
        <div className={`p-4 rounded-xl border-2 ${
          parseFloat(margin) >= 50
            ? 'bg-green-50 border-green-200'
            : parseFloat(margin) >= 30
            ? 'bg-blue-50 border-blue-200'
            : 'bg-orange-50 border-orange-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                parseFloat(margin) >= 50
                  ? 'bg-green-100'
                  : parseFloat(margin) >= 30
                  ? 'bg-blue-100'
                  : 'bg-orange-100'
              }`}>
                <TrendingUp className={`w-5 h-5 ${
                  parseFloat(margin) >= 50
                    ? 'text-green-600'
                    : parseFloat(margin) >= 30
                    ? 'text-blue-600'
                    : 'text-orange-600'
                }`} />
              </div>
              <div>
                <p className={`text-sm font-semibold ${
                  parseFloat(margin) >= 50
                    ? 'text-green-900'
                    : parseFloat(margin) >= 30
                    ? 'text-blue-900'
                    : 'text-orange-900'
                }`}>
                  Marge brute estimée
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  {formData.price && formData.costPrice &&
                    `Bénéfice: ${(parseFloat(formData.price) - parseFloat(formData.costPrice)).toLocaleString()} FCFA`
                  }
                </p>
              </div>
            </div>
            <div className={`text-3xl font-bold ${
              parseFloat(margin) >= 50
                ? 'text-green-600'
                : parseFloat(margin) >= 30
                ? 'text-blue-600'
                : 'text-orange-600'
            }`}>
              {margin}%
            </div>
          </div>
          
          {parseFloat(margin) < 30 && (
            <p className="text-xs text-orange-700 mt-3 flex items-start gap-2">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>
                Marge faible. Envisagez d'augmenter le prix ou de réduire les coûts.
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}