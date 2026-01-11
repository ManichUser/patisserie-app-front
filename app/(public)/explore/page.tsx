'use client'

import { useState } from 'react'
import { ProductCard } from '@/components/products/ProductCard'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  MapPin, 
  ChevronDown,
} from 'lucide-react'
import { BottomNav } from '@/components/layout/BottomNav'
import { products, categories, getPopularProducts } from "@/lib/constants"

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filtrer les produits selon la catégorie et la recherche
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || 
      product.category.toLowerCase() === categories.find(c => c.slug === selectedCategory)?.name.toLowerCase()
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Produits du jour (les 4 premiers populaires)
  const todaySpecials = getPopularProducts().slice(0, 4)

  // Produits populaires
  const popularItems = getPopularProducts()

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 pt-6 pb-4 space-y-4">
          {/* Location */}
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 text-sm">
              <MapPin className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-gray-900">Localisé à</span>
              <span className="text-gray-600">Ndogpassi 1er Danger</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Que voulez-vous manger aujourd'hui ?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
              fullWidth
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-6 py-6 space-y-8">
        {/* Hero Card */}
        <div className="bg-linear-to-br from-amber-600 to-amber-700 rounded-3xl p-6 text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-2">
            Qu'est-ce qu'on peut<br />vous préparer aujourd'hui ?
          </h2>
          <p className="text-amber-100 mb-4">
            Découvrez nos délicieuses pâtisseries
          </p>
          <button className="bg-white text-amber-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-amber-50 transition-colors">
            Explorer le menu
          </button>
        </div>

        {/* Categories */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Catégories</h2>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`shrink-0 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  selectedCategory === category.slug
                    ? 'bg-amber-700 text-white shadow-lg shadow-amber-700/30 scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
                }`}
              >
                <span className="mr-2 text-lg">{category.icon}</span>
                <span className="text-sm">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Today's Specials */}
        {!searchQuery && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Spéciaux du jour 🌟</h2>
                <p className="text-sm text-gray-600 mt-1">Fraîchement préparés pour vous</p>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
              {todaySpecials.map((product) => (
                <div key={product.id} className="shrink-0 w-44">
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Popular / Filtered Products */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {searchQuery 
                  ? `Résultats pour "${searchQuery}"`
                  : selectedCategory === 'all' 
                    ? 'Populaire 🔥' 
                    : categories.find(c => c.slug === selectedCategory)?.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
              </p>
            </div>

            {/* Bouton pour réinitialiser les filtres */}
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="text-xs text-amber-700 hover:text-amber-800 font-semibold transition-colors"
              >
                Réinitialiser
              </button>
            )}
          </div>

          {/* Grille de produits */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            // Message si aucun produit trouvé
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucun produit trouvé
              </h3>
              <p className="text-gray-600 mb-4">
                {searchQuery
                  ? `Aucun résultat pour "${searchQuery}"`
                  : 'Essayez une autre catégorie'}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchQuery('')
                }}
                className="bg-amber-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-800 transition-colors"
              >
                Voir tous les produits
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  )
}