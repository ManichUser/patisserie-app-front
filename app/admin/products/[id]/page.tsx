// app/admin/products/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Package,
  TrendingUp,
  Users,
  Clock,
  Weight,
  AlertCircle,
  Star,
  Heart,
  MessageSquare,
  Loader2,
  MoreVertical,
  Copy,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  categoryId?: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  stock: number;
  lowStockThreshold: number;
  sku?: string;
  weight?: number;
  servings?: number;
  prepTime?: number;
  ingredients?: string;
  allergens: string[];
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  available: boolean;
  likes: number;
  views: number;
  media: Array<{
    id: string;
    url: string;
    isFeatured: boolean;
    order: number;
  }>;
  _count?: {
    favorites: number;
    reviews: number;
    orderItems: number;
  };
  createdAt: string;
  updatedAt: string;
}

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Erreur chargement produit:', error);
      alert('Erreur lors du chargement du produit');
      router.push('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;

    try {
      await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      alert('✅ Produit supprimé avec succès');
      router.push('/admin/products');
    } catch (error) {
      console.error('Erreur suppression:', error);
      alert('❌ Erreur lors de la suppression');
    }
  };

  const handleToggleAvailable = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: !product?.available }),
      });
      const updated = await response.json();
      setProduct(updated);
    } catch (error) {
      console.error('Erreur toggle:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('✅ Copié dans le presse-papiers');
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

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Produit non trouvé</h2>
          <Link href="/admin/products" className="text-blue-600 hover:underline">
            Retour aux produits
          </Link>
        </div>
      </div>
    );
  }

  const margin = product.costPrice
    ? ((product.price - product.costPrice) / product.price * 100).toFixed(1)
    : null;

  const discount = product.compareAtPrice && product.compareAtPrice > product.price
    ? ((product.compareAtPrice - product.price) / product.compareAtPrice * 100).toFixed(0)
    : null;

  const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;
  const isOutOfStock = product.stock === 0;

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
                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    product.available
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {product.available ? 'Disponible' : 'Indisponible'}
                  </span>
                  {product.category && (
                    <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-700">
                      {product.category.name}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/admin/products/${productId}/edit`}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <Edit className="w-5 h-5" />
                Modifier
              </Link>

              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-700" />
                </button>

                {showMenu && (
                  <div className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-gray-200 py-2 w-48 z-50">
                    <button
                      onClick={handleToggleAvailable}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm font-medium text-gray-700"
                    >
                      {product.available ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {product.available ? 'Masquer' : 'Afficher'}
                    </button>
                    <button
                      onClick={() => copyToClipboard(product.sku || product.id)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm font-medium text-gray-700"
                    >
                      <Copy className="w-4 h-4" />
                      Copier {product.sku ? 'SKU' : 'ID'}
                    </button>
                    <div className="border-t border-gray-200 my-2" />
                    <button
                      onClick={handleDelete}
                      className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-3 text-sm font-medium text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                      Supprimer
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne gauche - Images */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image principale */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
                {product.media[selectedImage] ? (
                  <Image
                    src={product.media[selectedImage].url}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-24 h-24 text-gray-300" />
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.media.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                  {product.media.map((img, index) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-blue-500 scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt={`${product.name} ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Ingrédients & Allergènes */}
            {(product.ingredients || product.allergens.length > 0) && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Composition</h2>
                
                {product.ingredients && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Ingrédients</p>
                    <p className="text-sm text-gray-700">{product.ingredients}</p>
                  </div>
                )}

                {product.allergens.length > 0 && (
                  <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-red-900">Allergènes</p>
                        <p className="text-sm text-red-700 mt-1">
                          Contient: {product.allergens.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Informations nutritionnelles */}
            {(product.calories || product.protein || product.carbs || product.fat) && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Valeurs nutritionnelles</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {product.calories && (
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <p className="text-2xl font-bold text-blue-600">{product.calories}</p>
                      <p className="text-xs text-gray-600 mt-1">Calories (kcal)</p>
                    </div>
                  )}
                  {product.protein && (
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <p className="text-2xl font-bold text-green-600">{product.protein}g</p>
                      <p className="text-xs text-gray-600 mt-1">Protéines</p>
                    </div>
                  )}
                  {product.carbs && (
                    <div className="text-center p-4 bg-orange-50 rounded-xl">
                      <p className="text-2xl font-bold text-orange-600">{product.carbs}g</p>
                      <p className="text-xs text-gray-600 mt-1">Glucides</p>
                    </div>
                  )}
                  {product.fat && (
                    <div className="text-center p-4 bg-yellow-50 rounded-xl">
                      <p className="text-2xl font-bold text-yellow-600">{product.fat}g</p>
                      <p className="text-xs text-gray-600 mt-1">Lipides</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Colonne droite - Informations */}
          <div className="space-y-6">
            {/* Prix */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">TARIFICATION</h3>
              
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold text-gray-900">
                    {product.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-500">FCFA</span>
                </div>
                
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 line-through">
                      {product.compareAtPrice.toLocaleString()} FCFA
                    </span>
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded">
                      -{discount}%
                    </span>
                  </div>
                )}
              </div>

              {product.costPrice && margin && (
                <div className={`p-3 rounded-xl ${
                  parseFloat(margin) >= 50
                    ? 'bg-green-50 border border-green-200'
                    : parseFloat(margin) >= 30
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-orange-50 border border-orange-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Marge brute</span>
                    <span className={`text-lg font-bold ${
                      parseFloat(margin) >= 50
                        ? 'text-green-600'
                        : parseFloat(margin) >= 30
                        ? 'text-blue-600'
                        : 'text-orange-600'
                    }`}>
                      {margin}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Coût: {product.costPrice.toLocaleString()} FCFA • 
                    Bénéfice: {(product.price - product.costPrice).toLocaleString()} FCFA
                  </p>
                </div>
              )}
            </div>

            {/* Stock */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">STOCK</h3>
              
              <div className={`p-4 rounded-xl border-2 mb-4 ${
                isOutOfStock
                  ? 'bg-red-50 border-red-200'
                  : isLowStock
                  ? 'bg-orange-50 border-orange-200'
                  : 'bg-green-50 border-green-200'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    isOutOfStock
                      ? 'bg-red-500'
                      : isLowStock
                      ? 'bg-orange-500 animate-pulse'
                      : 'bg-green-500'
                  }`} />
                  <div>
                    <p className={`text-sm font-semibold ${
                      isOutOfStock
                        ? 'text-red-900'
                        : isLowStock
                        ? 'text-orange-900'
                        : 'text-green-900'
                    }`}>
                      {isOutOfStock
                        ? 'Rupture de stock'
                        : isLowStock
                        ? `Stock faible (${product.stock} unités)`
                        : `${product.stock} unités disponibles`
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Seuil d'alerte</span>
                  <span className="font-semibold text-gray-900">{product.lowStockThreshold} unités</span>
                </div>
                {product.sku && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">SKU</span>
                    <span className="font-mono font-semibold text-gray-900">{product.sku}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Caractéristiques */}
            {(product.weight || product.servings || product.prepTime) && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">CARACTÉRISTIQUES</h3>
                <div className="space-y-3">
                  {product.weight && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Weight className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{product.weight} kg</p>
                        <p className="text-xs text-gray-500">Poids</p>
                      </div>
                    </div>
                  )}
                  {product.servings && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{product.servings} parts</p>
                        <p className="text-xs text-gray-500">Portions</p>
                      </div>
                    </div>
                  )}
                  {product.prepTime && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{product.prepTime} min</p>
                        <p className="text-xs text-gray-500">Préparation</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Statistiques */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">STATISTIQUES</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Eye className="w-4 h-4 text-gray-500" />
                    <span className="text-2xl font-bold text-gray-900">{product.views}</span>
                  </div>
                  <p className="text-xs text-gray-600">Vues</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-2xl font-bold text-gray-900">{product._count?.favorites || 0}</span>
                  </div>
                  <p className="text-xs text-gray-600">Favoris</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    <span className="text-2xl font-bold text-gray-900">{product._count?.reviews || 0}</span>
                  </div>
                  <p className="text-xs text-gray-600">Avis</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Package className="w-4 h-4 text-green-500" />
                    <span className="text-2xl font-bold text-gray-900">{product._count?.orderItems || 0}</span>
                  </div>
                  <p className="text-xs text-gray-600">Vendus</p>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">INFORMATIONS</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Créé le</span>
                  <span className="font-medium text-gray-900">
                    {new Date(product.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Modifié le</span>
                  <span className="font-medium text-gray-900">
                    {new Date(product.updatedAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}