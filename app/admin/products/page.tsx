'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
//   Filter,
  Edit,
  Trash2,
  Eye,
  EyeOff,
//   MoreVertical,
//   ChevronDown,
} from 'lucide-react'

interface Product {
  id: string
  name: string
  category: { name: string } | null
  price: number
  costPrice: number | null
  stock: number
  available: boolean
  likes: number
  views: number
  media: { url: string; isFeatured: boolean }[]
  createdAt: string
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all') // all, available, outOfStock
  const [sortBy, setSortBy] = useState('recent') // recent, name, price, stock

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      // TODO: Remplacer par vrai appel API
      // const res = await fetch('/api/products')
      // const data = await res.json()

      // Mock data
      setProducts([
        {
          id: '1',
          name: 'Gâteau au Chocolat Suprême',
          category: { name: 'Gâteaux' },
          price: 8500,
          costPrice: 4000,
          stock: 12,
          available: true,
          likes: 45,
          views: 230,
          media: [
            {
              url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
              isFeatured: true,
            },
          ],
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Cupcake Vanille',
          category: { name: 'Cupcakes' },
          price: 1500,
          costPrice: 600,
          stock: 3,
          available: true,
          likes: 28,
          views: 150,
          media: [
            {
              url: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400',
              isFeatured: true,
            },
          ],
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Tarte aux Fruits',
          category: { name: 'Tartes' },
          price: 6500,
          costPrice: 3000,
          stock: 0,
          available: false,
          likes: 35,
          views: 180,
          media: [
            {
              url: 'https://images.unsplash.com/photo-1519915212116-715fb0bc3734?w=400',
              isFeatured: true,
            },
          ],
          createdAt: new Date().toISOString(),
        },
      ])
      setLoading(false)
    } catch (error) {
      console.error('Erreur chargement produits:', error)
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('fr-FR')} F`
  }

  const calculateMargin = (price: number, cost: number | null) => {
    if (!cost) return null
    const margin = ((price - cost) / price) * 100
    return margin.toFixed(0)
  }

  const toggleAvailability = async (productId: string) => {
    // TODO: Appel API
    setProducts(products.map(p => 
      p.id === productId ? { ...p, available: !p.available } : p
    ))
  }

  const deleteProduct = async (productId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return
    
    // TODO: Appel API
    setProducts(products.filter(p => p.id !== productId))
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filter === 'all' ||
      (filter === 'available' && product.available) ||
      (filter === 'outOfStock' && product.stock === 0)||
      (sortBy === 'recent' && product.createdAt) ||
        (sortBy === 'name' && product.name) ||
        (sortBy === 'price' && product.price) ||
        (sortBy === 'stock' && product.stock)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 lg:top-0 z-30">
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Produits</h1>
              <p className="text-sm text-gray-600 mt-1">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
              </p>
            </div>
            <Link
              href="/admin/products/new"
              className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Nouveau</span>
            </Link>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
              <option value="all">Tous</option>
              <option value="available">Disponibles</option>
              <option value="outOfStock">Rupture</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
              <option value="recent">Plus récents</option>
              <option value="name">Nom (A-Z)</option>
              <option value="price">Prix</option>
              <option value="stock">Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="p-4 md:p-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">Aucun produit trouvé</p>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium"
            >
              <Plus className="w-5 h-5" />
              Ajouter un produit
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                {/* Image */}
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src={product.media[0]?.url || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {!product.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Indisponible
                      </span>
                    </div>
                  )}
                  {product.stock <= 5 && product.stock > 0 && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Stock faible
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">
                        {product.category?.name || 'Sans catégorie'}
                      </p>
                      <h3 className="font-semibold text-gray-900 line-clamp-2">
                        {product.name}
                      </h3>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                    <span>👁️ {product.views}</span>
                    <span>❤️ {product.likes}</span>
                    <span>📦 {product.stock}</span>
                  </div>

                  {/* Price & Margin */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-lg font-bold text-blue-700">
                        {formatPrice(product.price)}
                      </p>
                      {product.costPrice && (
                        <p className="text-xs text-gray-500">
                          Coût: {formatPrice(product.costPrice)}
                        </p>
                      )}
                    </div>
                    {product.costPrice && (
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-600">
                          {calculateMargin(product.price, product.costPrice)}%
                        </p>
                        <p className="text-xs text-gray-500">Marge</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAvailability(product.id)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        product.available
                          ? 'bg-green-50 text-green-700 hover:bg-green-100'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {product.available ? (
                        <span className="flex items-center justify-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span className="hidden sm:inline">Actif</span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-1">
                          <EyeOff className="w-4 h-4" />
                          <span className="hidden sm:inline">Inactif</span>
                        </span>
                      )}
                    </button>
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="hidden sm:inline">Modifier</span>
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-50 text-red-700 p-2 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}