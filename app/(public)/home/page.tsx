'use client'

import { MobileHeader } from "@/components/layout/MobileHeader"
import { SpecialOffers } from "@/components/home/SpecialOffers"
import { ProductCard } from "@/components/products/ProductCard"
import { useState } from "react"
import { BottomNav } from "@/components/layout/BottomNav"
import { products, categories, getPopularProducts } from "@/lib/constants"

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // ✅ Fonction pour recevoir la recherche depuis le SearchBar
  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  // Filtrer les produits selon la catégorie et la recherche
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || 
      product.category.toLowerCase() === categories.find(c => c.slug === selectedCategory)?.name.toLowerCase()
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Produits populaires
  const popularProducts = getPopularProducts()

  return (
    <main className="pb-20 h-screen overflow-y-auto bg-gray-50">
      {/* ✅ Passe la fonction handleSearch au header */}
      <MobileHeader onSearch={handleSearch} />
      
      <div className="mt-52 pt-1">
        {/* Offres spéciales */}
        <SpecialOffers />

        {/* Catégories */}
        <div className="px-4 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Catégories</h2>
          </div>
          
          {/* Liste des catégories - Scrollable horizontalement */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`shrink-0 px-5 py-3 rounded-xl font-semibold transition-all duration-200 ${
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

        {/* Section Populaires - Visible uniquement si pas de recherche */}
        {selectedCategory === 'all' && !searchQuery && (
          <div className="px-4 mt-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Nos Best-sellers 🔥</h2>
                <p className="text-sm text-gray-600 mt-1">Les produits les plus aimés</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {popularProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        )}

        {/* Tous les produits filtrés */}
        <div className="px-4 mt-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {searchQuery 
                  ? `Résultats pour "${searchQuery}"`
                  : selectedCategory === 'all' 
                    ? 'Tous nos produits' 
                    : categories.find(c => c.slug === selectedCategory)?.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
              </p>
            </div>

            {/* ✅ Bouton pour réinitialiser les filtres */}
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="text-xs text-amber-700 hover:text-amber-800 font-semibold"
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

      {/* Navigation du bas */}
      <BottomNav />
    </main>
  )
}