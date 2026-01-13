// app/admin/categories/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Plus, RefreshCw, Search, Package, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';

import { CategoryCard } from '@/components/admin/categories/CategoryCard';
import { CategoryModal } from '@/components/admin/categories/CategoryModal';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'urgent' | 'high' | 'medium'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [showRecommendations, setShowRecommendations] = useState(true);

  useEffect(() => {
    fetchCategories();

  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data.data || []);
      

    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };




  const handleSaveCategory = async (data: any) => {
    try {
      const method = selectedCategory ? 'PATCH' : 'POST';
      const url = selectedCategory
        ? `/api/categories/${selectedCategory.id}`
        : '/api/categories';

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      await fetchCategories();
      setIsModalOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) return;

    try {
      await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      await fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      await fetch(`/api/categories/${id}/toggle`, { method: 'PATCH' });
      await fetchCategories();
    } catch (error) {
      console.error('Error toggling category:', error);
    }
  };

  
  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Section Catégories */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Mes Catégories</h2>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nouvelle catégorie
            </button>
          </div>

          {/* Barre de recherche */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une catégorie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Grille des catégories */}
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Chargement des catégories...</p>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune catégorie</h3>
              <p className="text-gray-500 mb-6">Créez votre première catégorie pour commencer</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Créer une catégorie
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map(category => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onEdit={(cat) => {
                    setSelectedCategory(cat);
                    setIsModalOpen(true);
                  }}
                  onDelete={handleDeleteCategory}
                  onToggleActive={handleToggleActive}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        category={selectedCategory}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCategory(null);
        }}
        onSave={handleSaveCategory}
      />
    </div>
  );
}