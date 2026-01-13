// app/admin/products/[id]/edit/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { ImageSection } from '@/components/admin/products/ImageSection';
import { BasicInfoSection } from '@/components/admin/products/BasicInfoSection';
import { PricingSection } from '@/components/admin/products/PricingSection';
import { StockSection } from '@/components/admin/products/StockSection';
import { ProductDetailsSection } from '@/components/admin/products/ProductDetailsSection';
import { NutritionSection } from '@/components/admin/products/NutritionSection';

interface ProductImage {
  id?: string;
  url?: string;
  file?: File;
  preview: string;
  isFeatured: boolean;
  order?: number;
}

interface Category {
  id: string;
  name: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<ProductImage[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    compareAtPrice: '',
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
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, [productId]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error('Erreur chargement catégories:', error);
    }
  };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${productId}`);
      const product = await response.json();

      // Remplir le formulaire
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        compareAtPrice: product.compareAtPrice?.toString() || '',
        costPrice: product.costPrice?.toString() || '',
        categoryId: product.categoryId || '',
        stock: product.stock?.toString() || '0',
        lowStockThreshold: product.lowStockThreshold?.toString() || '5',
        sku: product.sku || '',
        weight: product.weight?.toString() || '',
        servings: product.servings?.toString() || '',
        prepTime: product.prepTime?.toString() || '',
        ingredients: product.ingredients || '',
        allergens: product.allergens || [],
        calories: product.calories?.toString() || '',
        protein: product.protein?.toString() || '',
        carbs: product.carbs?.toString() || '',
        fat: product.fat?.toString() || '',
        available: product.available ?? true,
      });

      // Charger les images
      if (product.media && product.media.length > 0) {
        setImages(
          product.media.map((media: any) => ({
            id: media.id,
            url: media.url,
            preview: media.url,
            isFeatured: media.isFeatured,
            order: media.order,
          }))
        );
      }
    } catch (error) {
      console.error('Erreur chargement produit:', error);
      alert('Erreur lors du chargement du produit');
    //   router.push('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));

    // Clear error
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAllergenToggle = (allergen: string) => {
    setFormData(prev => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter(a => a !== allergen)
        : [...prev.allergens, allergen],
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Le prix doit être supérieur à 0';
    }
    if (!formData.categoryId) {
      newErrors.categoryId = 'Sélectionnez une catégorie';
    }
    if (images.length === 0) {
      newErrors.images = 'Ajoutez au moins une image';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstError}"]`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSaving(true);

    try {
      // 1. Upload new images if any
      const newImages = images.filter(img => img.file);
      let uploadedImages: any[] = [];

      if (newImages.length > 0) {
        // TODO: Upload images to cloud storage
        // const formData = new FormData();
        // newImages.forEach((img, index) => {
        //   if (img.file) formData.append(`images`, img.file);
        // });
        // const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
        // uploadedImages = await uploadRes.json();
      }

      // 2. Prepare media array
      const existingImages = images.filter(img => img.id);
      const mediaToSave = [
        ...existingImages.map((img, index) => ({
          id: img.id,
          url: img.url,
          isFeatured: img.isFeatured,
          order: index,
        })),
        ...uploadedImages.map((img: any, index: number) => ({
          url: img.url,
          publicId: img.publicId,
          isFeatured: existingImages.length === 0 && index === 0,
          order: existingImages.length + index,
        })),
      ];

      // 3. Update product
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : null,
          costPrice: formData.costPrice ? parseFloat(formData.costPrice) : null,
          stock: formData.stock ? parseInt(formData.stock) : 0,
          lowStockThreshold: parseInt(formData.lowStockThreshold) || 5,
          weight: formData.weight ? parseFloat(formData.weight) : null,
          servings: formData.servings ? parseInt(formData.servings) : null,
          prepTime: formData.prepTime ? parseInt(formData.prepTime) : null,
          calories: formData.calories ? parseInt(formData.calories) : null,
          protein: formData.protein ? parseFloat(formData.protein) : null,
          carbs: formData.carbs ? parseFloat(formData.carbs) : null,
          fat: formData.fat ? parseFloat(formData.fat) : null,
          media: mediaToSave,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }

      // Success
      alert('Produit mis à jour avec succès !');
      router.push('/admin/products');
    } catch (error) {
      console.error('Erreur mise à jour produit:', error);
      alert('Erreur lors de la mise à jour du produit');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/products"
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Modifier le produit</h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  {formData.name || 'Sans titre'}
                </p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Enregistrer
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Images */}
          <ImageSection
            images={images}
            onImagesChange={setImages}
            error={errors.images}
          />

          {/* Basic Info */}
          <BasicInfoSection
            formData={formData}
            categories={categories}
            errors={errors}
            onChange={handleChange}
          />

          {/* Pricing */}
          <PricingSection
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />

          {/* Stock */}
          <StockSection
            formData={formData}
            onChange={handleChange}
          />

          {/* Product Details */}
          <ProductDetailsSection
            formData={formData}
            onChange={handleChange}
            onAllergenToggle={handleAllergenToggle}
          />

          {/* Nutrition */}
          <NutritionSection
            formData={formData}
            onChange={handleChange}
          />

          {/* Sticky Bottom Actions */}
          <div className="sticky bottom-4 bg-white border-2 border-gray-200 rounded-2xl p-4 shadow-lg">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 font-semibold shadow-md hover:shadow-lg"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enregistrement en cours...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Enregistrer les modifications
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}