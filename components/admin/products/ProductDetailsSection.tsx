// components/admin/products/ProductDetailsSection.tsx
'use client';

import { Weight, Users, Clock, List, AlertCircle } from 'lucide-react';

interface ProductDetailsSectionProps {
  formData: {
    weight: string;
    servings: string;
    prepTime: string;
    ingredients: string;
    allergens: string[];
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onAllergenToggle: (allergen: string) => void;
}

const commonAllergens = [
  { id: 'gluten', label: 'Gluten', icon: '🌾' },
  { id: 'milk', label: 'Lait', icon: '🥛' },
  { id: 'eggs', label: 'Œufs', icon: '🥚' },
  { id: 'nuts', label: 'Fruits à coque', icon: '🥜' },
  { id: 'soy', label: 'Soja', icon: '🫘' },
  { id: 'peanuts', label: 'Arachides', icon: '🥜' },
  { id: 'fish', label: 'Poisson', icon: '🐟' },
  { id: 'shellfish', label: 'Crustacés', icon: '🦐' },
];

export function ProductDetailsSection({
  formData,
  onChange,
  onAllergenToggle,
}: ProductDetailsSectionProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Détails du produit</h2>
        <p className="text-sm text-gray-500">
          Informations complémentaires sur votre produit
        </p>
      </div>

      {/* Caractéristiques */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Poids */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Poids (kg)
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Weight className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={onChange}
              placeholder="1.5"
              step="0.1"
              min="0"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all"
            />
          </div>
        </div>

        {/* Portions */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Nombre de parts
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="number"
              name="servings"
              value={formData.servings}
              onChange={onChange}
              placeholder="8"
              min="1"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all"
            />
          </div>
        </div>

        {/* Temps préparation */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Préparation (min)
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="number"
              name="prepTime"
              value={formData.prepTime}
              onChange={onChange}
              placeholder="30"
              min="0"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Ingrédients */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <List className="w-4 h-4 text-gray-500" />
          Ingrédients
        </label>
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={onChange}
          rows={4}
          placeholder="Farine de blé, sucre, chocolat noir 70%, œufs frais, beurre doux, levure..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all resize-none"
        />
        <p className="mt-2 text-xs text-gray-500">
          Listez les ingrédients principaux séparés par des virgules
        </p>
      </div>

      {/* Allergènes */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-gray-500" />
          Allergènes et intolérances
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {commonAllergens.map(allergen => {
            const isSelected = formData.allergens.includes(allergen.id);
            
            return (
              <button
                key={allergen.id}
                type="button"
                onClick={() => onAllergenToggle(allergen.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{allergen.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${
                      isSelected ? 'text-red-900' : 'text-gray-900'
                    }`}>
                      {allergen.label}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        
        {formData.allergens.length > 0 && (
          <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-200">
            <p className="text-sm text-red-700 font-medium flex items-start gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>
                Ce produit contient: <strong>{formData.allergens.join(', ')}</strong>
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}