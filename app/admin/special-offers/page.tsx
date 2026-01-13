// app/admin/special-offers/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Plus, Tag, TrendingUp, Users, DollarSign, Filter } from 'lucide-react';
import { OfferStatCard } from '@/components/admin/offers/OfferStatCard';
import { OfferCard } from '@/components/admin/offers/OfferCard';
import { OfferModal } from '@/components/admin/offers/OfferModal';
import { SpecialOffer } from '@/lib/types';

// Mock data
const mockOffers:SpecialOffer[] = [
  {
    id: '1',
    title: '-20% sur tous les gâteaux',
    description: 'Profitez de 20% de réduction sur notre sélection de gâteaux artisanaux',
    type: 'DISCOUNT',
    image: undefined,
    badge: '-20%',
    discountType: 'PERCENTAGE',
    discountValue: 20,
    minPurchase: 5000,
    maxDiscount: 10000,
    startDate: '2024-01-10T00:00:00Z',
    endDate: '2024-01-31T23:59:59Z',
    usageLimit: 100,
    usageCount: 45,
    isActive: true,
    productIds: [],
    categoryIds: ['cat-1'],
  },
  {
    id: '2',
    title: 'Livraison gratuite dès 15000 FCFA',
    description: 'Commandez pour minimum 15000 FCFA et bénéficiez de la livraison gratuite',
    type: 'FREE_DELIVERY',
    image: undefined,
    badge: 'GRATUIT',
    discountType: 'FIXED_AMOUNT',
    discountValue: 2000,
    minPurchase: 15000,
    maxDiscount: undefined,
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-01-31T23:59:59Z',
    usageLimit: undefined,
    usageCount: 234,
    isActive: true,
    productIds: [],
    categoryIds: [],
  },
  {
    id: '3',
    title: 'Flash Sale - Macarons à -50%',
    description: 'Vente flash exceptionnelle sur nos macarons',
    type: 'FLASH_SALE',
    image: undefined,
    badge: '-50%',
    discountType: 'PERCENTAGE',
    discountValue: 50,
    minPurchase: undefined,
    maxDiscount: undefined,
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-01-17T23:59:59Z',
    usageLimit: 50,
    usageCount: 12,
    isActive: true,
    productIds: ['prod-1', 'prod-2'],
    categoryIds: [],
  },
  {
    id: '4',
    title: 'Pack Famille - 3 gâteaux',
    description: 'Achetez 3 gâteaux et économisez 5000 FCFA',
    type: 'BUNDLE',
    image: undefined,
    badge: 'PACK',
    discountType: 'FIXED_AMOUNT',
    discountValue: 5000,
    minPurchase: undefined,
    maxDiscount: undefined,
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-02-29T23:59:59Z',
    usageLimit: undefined,
    usageCount: 67,
    isActive: false,
    productIds: [],
    categoryIds: ['cat-1'],
  },
];

export default function SpecialOffersPage() {
  const [offers, setOffers] = useState(mockOffers);
  const [filteredOffers, setFilteredOffers] = useState(mockOffers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive' | 'expired'>('all');

  const stats = {
    totalOffers: offers.length,
    activeOffers: offers.filter(o => o.isActive).length,
    totalUsage: offers.reduce((sum, o) => sum + o.usageCount, 0),
    estimatedSavings: 125000, // Mock
  };

  useEffect(() => {
    let filtered = offers;

    if (filter === 'active') {
      filtered = offers.filter(o => o.isActive && new Date(o.endDate) >= new Date());
    } else if (filter === 'inactive') {
      filtered = offers.filter(o => !o.isActive);
    } else if (filter === 'expired') {
      filtered = offers.filter(o => new Date(o.endDate) < new Date());
    }

    setFilteredOffers(filtered);
  }, [filter, offers]);

  const handleSave = async (formData: any) => {
    if (selectedOffer) {
      // Update
      setOffers(offers.map(o => 
        o.id === selectedOffer.id 
          ? {
              ...o,
              ...formData,
              discountValue: parseFloat(formData.discountValue),
              minPurchase: formData.minPurchase ? parseFloat(formData.minPurchase) : null,
              maxDiscount: formData.maxDiscount ? parseFloat(formData.maxDiscount) : null,
              usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : null,
              limitPerUser: formData.limitPerUser ? parseInt(formData.limitPerUser) : null,
            }
          : o
      ));
    } else {
      // Create
      const newOffer = {
        id: Date.now().toString(),
        ...formData,
        discountValue: parseFloat(formData.discountValue),
        minPurchase: formData.minPurchase ? parseFloat(formData.minPurchase) : null,
        maxDiscount: formData.maxDiscount ? parseFloat(formData.maxDiscount) : null,
        usageLimit: formData.usageLimit ? parseInt(formData.usageLimit) : null,
        limitPerUser: formData.limitPerUser ? parseInt(formData.limitPerUser) : null,
        usageCount: 0,
        image: null,
      };
      setOffers([newOffer, ...offers]);
    }

    setIsModalOpen(false);
    setSelectedOffer(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) return;
    setOffers(offers.filter(o => o.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setOffers(offers.map(o => 
      o.id === id ? { ...o, isActive: !o.isActive } : o
    ));
  };

  const handleDuplicate = (offer: any) => {
    const duplicate = {
      ...offer,
      id: Date.now().toString(),
      title: `${offer.title} (Copie)`,
      usageCount: 0,
      isActive: false,
    };
    setOffers([duplicate, ...offers]);
  };

  const handleEdit = (offer: any) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Offres spéciales</h1>
              <p className="text-sm text-gray-600 mt-0.5">
                Créez et gérez vos promotions
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedOffer(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              <Plus className="w-5 h-5" />
              Nouvelle offre
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <OfferStatCard
            label="Total des offres"
            value={stats.totalOffers}
            icon={Tag}
            variant="default"
          />

          <OfferStatCard
            label="Offres actives"
            value={stats.activeOffers}
            icon={TrendingUp}
            variant="success"
          />

          <OfferStatCard
            label="Utilisations totales"
            value={stats.totalUsage}
            icon={Users}
            variant="info"
          />

          <OfferStatCard
            label="Économies générées"
            value={`${stats.estimatedSavings.toLocaleString()} FCFA`}
            icon={DollarSign}
            variant="warning"
            subtitle="Ce mois"
          />
        </div>

        {/* Filtres */}
        <div className="flex items-center gap-3 mb-6">
          <Filter className="w-5 h-5 text-gray-500" />
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'Toutes' },
              { key: 'active', label: 'Actives' },
              { key: 'inactive', label: 'Inactives' },
              { key: 'expired', label: 'Expirées' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key as any)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                  filter === f.key
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Liste des offres */}
        {filteredOffers.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune offre trouvée
            </h3>
            <p className="text-gray-600 mb-6">
              {filter !== 'all' 
                ? 'Essayez de modifier vos filtres'
                : 'Commencez par créer votre première offre spéciale'
              }
            </p>
            {filter === 'all' && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Créer une offre
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map(offer => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleActive={handleToggleActive}
                onDuplicate={handleDuplicate}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <OfferModal
        isOpen={isModalOpen}
        offer={selectedOffer}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOffer(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}