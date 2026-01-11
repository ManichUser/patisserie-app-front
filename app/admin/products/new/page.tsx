'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Trash2,
  Save,
  Image as ImageIcon,
  AlertCircle,
} from 'lucide-react'
import Link from 'next/link'

interface Category {
  id: string
  name: string
}

interface ProductImage {
  file?: File
  preview: string
  isFeatured: boolean
}

export default function NewProductPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<ProductImage[]>([])
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    costPrice: '',
    categoryId: '',
    stock: '',
    lowStockThreshold: '5',
    sku: '',
    weight: '',
    servings: '',
    prepTime: '',
    ingredients: '',
    allergens: [] as string[],
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    available: true,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      // TODO: const res = await fetch('/api/categories')
      // const data = await res.json()
      
      // Mock data
      setCategories([
        { id: '1', name: 'Gâteaux' },
        { id: '2', name: 'Cupcakes' },
        { id: '3', name: 'Tartes' },
        { id: '4', name: 'Viennoiseries' },
        { id: '5', name: 'Biscuits' },
      ])
    } catch (error) {
      console.error('Erreur chargement catégories:', error)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      isFeatured: images.length === 0, // First image is featured
    }))

    setImages([...images, ...newImages])
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const setFeaturedImage = (index: number) => {
    setImages(images.map((img, i) => ({
      ...img,
      isFeatured: i === index,
    })))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleAllergenToggle = (allergen: string) => {
    setFormData(prev => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter(a => a !== allergen)
        : [...prev.allergens, allergen],
    }))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis'
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Le prix doit être supérieur à 0'
    }
    if (!formData.categoryId) {
      newErrors.categoryId = 'Sélectionnez une catégorie'
    }
    if (images.length === 0) {
      newErrors.images = 'Ajoutez au moins une image'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setLoading(true)

    try {
      // 1. Upload images first
      // TODO: const uploadedImages = await uploadImages(images)

      // 2. Create product
      // TODO: const res = await fetch('/api/products', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     price: parseFloat(formData.price),
      //     costPrice: formData.costPrice ? parseFloat(formData.costPrice) : null,
      //     stock: formData.stock ? parseInt(formData.stock) : 0,
      //     media: uploadedImages,
      //   }),
      // })

      // Simuler la création
      await new Promise(resolve => setTimeout(resolve, 1500))

      alert('Produit créé avec succès !')
      router.push('/admin/products')
    } catch (error) {
      console.error('Erreur création produit:', error)
      alert('Erreur lors de la création du produit')
    } finally {
      setLoading(false)
    }
  }

  const commonAllergens = ['Gluten', 'Lait', 'Œufs', 'Fruits à coque', 'Soja', 'Arachides']

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 lg:top-0 z-30">
        <div className="p-4 md:p-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/products"
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Nouveau produit</h1>
              <p className="text-sm text-gray-600 mt-1">Ajoutez un nouveau produit à votre catalogue</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
        {/* Images */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4">Images du produit</h2>
          
          {errors.images && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.images}
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {images.map((img, index) => (
              <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                <img
                  src={img.preview}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFeaturedImage(index)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium ${
                      img.isFeatured
                        ? 'bg-amber-600 text-white'
                        : 'bg-white text-gray-700'
                    }`}
                  >
                    {img.isFeatured ? 'Principal' : 'Définir'}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {img.isFeatured && (
                  <span className="absolute top-2 left-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Principal
                  </span>
                )}
              </div>
            ))}

            {/* Upload button */}
            <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-amber-600 hover:bg-amber-50 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Ajouter</span>
            </label>
          </div>

          <p className="text-xs text-gray-500">
            Cliquez sur "Définir" pour choisir l'image principale. Formats: JPG, PNG (max 5MB)
          </p>
        </div>

        {/* Informations de base */}
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-gray-900 mb-4">Informations de base</h2>

          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom du produit *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Gâteau au Chocolat Suprême"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Décrivez votre produit..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie *
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 ${
                errors.categoryId ? 'border-red-500' : ''
              }`}
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>
            )}
          </div>

          {/* SKU */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Référence (SKU)
            </label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="Ex: GAT-CHOC-001"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
          </div>
        </div>

        {/* Prix */}
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-gray-900 mb-4">Tarification</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Prix de vente */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix de vente (FCFA) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="8500"
                min="0"
                step="100"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 ${
                  errors.price ? 'border-red-500' : ''
                }`}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>

            {/* Coût de revient */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coût de revient (FCFA)
              </label>
              <input
                type="number"
                name="costPrice"
                value={formData.costPrice}
                onChange={handleChange}
                placeholder="4000"
                min="0"
                step="100"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
              <p className="text-xs text-gray-500 mt-1">
                Pour calculer votre marge automatiquement
              </p>
            </div>
          </div>

          {/* Marge calculée */}
          {formData.price && formData.costPrice && (
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-700">
                Marge estimée:{' '}
                {(((parseFloat(formData.price) - parseFloat(formData.costPrice)) / parseFloat(formData.price)) * 100).toFixed(1)}%
              </p>
            </div>
          )}
        </div>

        {/* Stock */}
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-gray-900 mb-4">Gestion du stock</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Stock initial */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock initial
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="10"
                min="0"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            {/* Seuil d'alerte */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seuil d'alerte
              </label>
              <input
                type="number"
                name="lowStockThreshold"
                value={formData.lowStockThreshold}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
              <p className="text-xs text-gray-500 mt-1">
                Alerte quand le stock descend en dessous
              </p>
            </div>
          </div>

          {/* Disponible */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="w-4 h-4 text-amber-700 rounded focus:ring-amber-700"
            />
            <span className="text-sm text-gray-700">Produit disponible à la vente</span>
          </label>
        </div>

        {/* Détails produit */}
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-gray-900 mb-4">Détails du produit</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Poids */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poids (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="1.5"
                step="0.1"
                min="0"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            {/* Parts */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de parts
              </label>
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                placeholder="8"
                min="1"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            {/* Temps préparation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Préparation (min)
              </label>
              <input
                type="number"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                placeholder="30"
                min="0"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>
          </div>

          {/* Ingrédients */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingrédients
            </label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows={3}
              placeholder="Farine, sucre, chocolat noir, œufs, beurre..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
          </div>

          {/* Allergènes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allergènes
            </label>
            <div className="flex flex-wrap gap-2">
              {commonAllergens.map(allergen => (
                <button
                  key={allergen}
                  type="button"
                  onClick={() => handleAllergenToggle(allergen)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    formData.allergens.includes(allergen)
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {allergen}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Informations nutritionnelles */}
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="font-bold text-gray-900 mb-4">Informations nutritionnelles (optionnel)</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calories
              </label>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                placeholder="350"
                min="0"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Protéines (g)
              </label>
              <input
                type="number"
                name="protein"
                value={formData.protein}
                onChange={handleChange}
                placeholder="5"
                min="0"
                step="0.1"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Glucides (g)
              </label>
              <input
                type="number"
                name="carbs"
                value={formData.carbs}
                onChange={handleChange}
                placeholder="45"
                min="0"
                step="0.1"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lipides (g)
              </label>
              <input
                type="number"
                name="fat"
                value={formData.fat}
                onChange={handleChange}
                placeholder="15"
                min="0"
                step="0.1"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sticky bottom-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors disabled:opacity-50 font-medium"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Création...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Créer le produit
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}