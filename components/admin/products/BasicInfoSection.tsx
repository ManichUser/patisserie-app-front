// components/admin/products/BasicInfoSection.tsx
'use client';

interface Category {
  id: string;
  name: string;
}

interface BasicInfoSectionProps {
  formData: {
    name: string;
    description: string;
    categoryId: string;
    sku: string;
  };
  categories: Category[];
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function BasicInfoSection({
  formData,
  categories,
  errors,
  onChange,
}: BasicInfoSectionProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Informations de base</h2>
        <p className="text-sm text-gray-500">
          Les informations essentielles de votre produit
        </p>
      </div>

      {/* Nom */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Nom du produit <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Ex: Gâteau au Chocolat Fondant"
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
            errors.name
              ? 'border-red-300 focus:border-red-500 bg-red-50'
              : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
          }`}
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.name}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          rows={4}
          placeholder="Décrivez votre produit en détail..."
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all resize-none"
        />
        <p className="mt-2 text-xs text-gray-500">
          {formData.description.length}/500 caractères
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Catégorie */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Catégorie <span className="text-red-500">*</span>
          </label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={onChange}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all appearance-none bg-white ${
              errors.categoryId
                ? 'border-red-300 focus:border-red-500 bg-red-50'
                : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
            }`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1.25rem',
            }}
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.categoryId}
            </p>
          )}
        </div>

        {/* SKU */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Référence (SKU)
          </label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={onChange}
            placeholder="Ex: GAT-CHOC-001"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-all font-mono text-sm"
          />
          <p className="mt-2 text-xs text-gray-500">
            Identifiant unique pour la gestion d'inventaire
          </p>
        </div>
      </div>
    </div>
  );
}