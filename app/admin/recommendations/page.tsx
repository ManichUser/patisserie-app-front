'use client'

import { useState, useEffect } from 'react'
import {
  AlertCircle,
  TrendingUp,
  Package,
  DollarSign,
  Users,
  ShoppingCart,
  Sparkles,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
} from 'lucide-react'

interface Recommendation {
  id: string
  type: string
  priority: string
  title: string
  description: string
  suggestedActions: string[]
  estimatedImpact: string
  status: string
  isDismissed: boolean
  wasImplemented: boolean
  createdAt: string
  metrics?: any
}

export default function AdminRecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, urgent, high, medium
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    fetchRecommendations()
    fetchStats()
  }, [])

  const fetchRecommendations = async () => {
    try {
      // TODO: Remplacer par vrai appel API
      // const res = await fetch('/api/business-recommendations?onlyActive=true')
      // const data = await res.json()

      // Mock data
      setRecommendations([
        {
          id: '1',
          type: 'INVENTORY',
          priority: 'URGENT',
          title: 'Stock critique sur 3 produits',
          description: 'Gâteau au Chocolat (2 restants), Cupcakes Vanille (3 restants), Tarte aux Fruits (1 restant)',
          suggestedActions: [
            'Commander 20 unités de Gâteau au Chocolat',
            'Préparer 15 Cupcakes Vanille supplémentaires',
            'Réapprovisionner la Tarte aux Fruits',
          ],
          estimatedImpact: 'Éviter 8-12 ventes perdues cette semaine',
          status: 'PENDING',
          isDismissed: false,
          wasImplemented: false,
          createdAt: new Date().toISOString(),
          metrics: { productsCount: 3 },
        },
        {
          id: '2',
          type: 'PRICING',
          priority: 'HIGH',
          title: 'Marge faible sur Red Velvet',
          description: 'Le Red Velvet a une marge de seulement 15% (objectif: 30%)',
          suggestedActions: [
            'Augmenter le prix de 1500 FCFA',
            'Réduire le coût de production de 800 FCFA',
            'Négocier avec le fournisseur de chocolat',
          ],
          estimatedImpact: 'Augmenter le profit de 25%',
          status: 'PENDING',
          isDismissed: false,
          wasImplemented: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          type: 'MARKETING',
          priority: 'HIGH',
          title: 'Cheesecake très demandé',
          description: '150 vues et 45 ventes ce mois - produit star',
          suggestedActions: [
            'Créer une offre spéciale 2+1',
            'Promouvoir sur WhatsApp Status',
            'Augmenter le stock de 30%',
          ],
          estimatedImpact: 'Peut augmenter les ventes de 30%',
          status: 'PENDING',
          isDismissed: false,
          wasImplemented: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: '4',
          type: 'CUSTOMER_RETENTION',
          priority: 'MEDIUM',
          title: '45 clients inactifs depuis 30+ jours',
          description: 'Des clients réguliers n\'ont pas commandé récemment',
          suggestedActions: [
            'Envoyer un code promo de réactivation (-20%)',
            'Message WhatsApp personnalisé',
            'Offre spéciale "On vous a manqué"',
          ],
          estimatedImpact: 'Récupérer 12-15 clients (environ 45 000 FCFA)',
          status: 'PENDING',
          isDismissed: false,
          wasImplemented: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: '5',
          type: 'COST_REDUCTION',
          priority: 'MEDIUM',
          title: 'Dépenses en hausse de +22%',
          description: '180 000 FCFA ce mois vs 145 000 FCFA le mois dernier',
          suggestedActions: [
            'Analyser les dépenses par catégorie',
            'Renégocier avec les fournisseurs',
            'Optimiser les achats en gros',
          ],
          estimatedImpact: 'Peut réduire les coûts de 10-15%',
          status: 'PENDING',
          isDismissed: false,
          wasImplemented: false,
          createdAt: new Date().toISOString(),
        },
      ])

      setLoading(false)
    } catch (error) {
      console.error('Erreur chargement recommandations:', error)
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    // TODO: API call
    setStats({
      total: 5,
      implemented: 0,
      pending: 5,
      dismissed: 0,
    })
  }

  const generateRecommendations = async () => {
    setGenerating(true)
    try {
      // TODO: await fetch('/api/business-recommendations/generate', { method: 'POST' })
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simuler
      await fetchRecommendations()
      await fetchStats()
    } catch (error) {
      console.error('Erreur génération:', error)
    }
    setGenerating(false)
  }

  const implementRecommendation = async (id: string) => {
    try {
      // TODO: await fetch(`/api/business-recommendations/${id}/implement`, { method: 'PATCH' })
      setRecommendations(recommendations.map(r =>
        r.id === id ? { ...r, status: 'IMPLEMENTED', wasImplemented: true } : r
      ))
    } catch (error) {
      console.error('Erreur implémentation:', error)
    }
  }

  const dismissRecommendation = async (id: string) => {
    if (!confirm('Ignorer cette recommandation ?')) return
    
    try {
      // TODO: await fetch(`/api/business-recommendations/${id}/dismiss`, { method: 'PATCH' })
      setRecommendations(recommendations.filter(r => r.id !== id))
    } catch (error) {
      console.error('Erreur rejet:', error)
    }
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      INVENTORY: Package,
      PRICING: DollarSign,
      MARKETING: TrendingUp,
      CUSTOMER_RETENTION: Users,
      COST_REDUCTION: DollarSign,
      PROMOTION: ShoppingCart,
    }
    return icons[type as keyof typeof icons] || AlertCircle
  }

  const getTypeColor = (type: string) => {
    const colors = {
      INVENTORY: 'bg-blue-100 text-blue-700',
      PRICING: 'bg-green-100 text-green-700',
      MARKETING: 'bg-purple-100 text-purple-700',
      CUSTOMER_RETENTION: 'bg-orange-100 text-orange-700',
      COST_REDUCTION: 'bg-red-100 text-red-700',
      PROMOTION: 'bg-amber-100 text-amber-700',
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700'
  }

  const getPriorityBadge = (priority: string) => {
    const config = {
      URGENT: { label: 'Urgent', color: 'bg-red-100 text-red-700' },
      HIGH: { label: 'Élevée', color: 'bg-orange-100 text-orange-700' },
      MEDIUM: { label: 'Moyenne', color: 'bg-yellow-100 text-yellow-700' },
      LOW: { label: 'Basse', color: 'bg-blue-100 text-blue-700' },
    }
    const c = config[priority as keyof typeof config] || config.MEDIUM
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${c.color}`}>
        {c.label}
      </span>
    )
  }

  const filteredRecommendations = recommendations.filter(rec => {
    if (filter === 'all') return true
    return rec.priority === filter.toUpperCase()
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-amber-700 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 lg:top-0 z-30">
        <div className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-600" />
                Recommandations IA
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Suggestions pour optimiser votre boutique
              </p>
            </div>

            <button
              onClick={generateRecommendations}
              disabled={generating}
              className="flex items-center gap-2 bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors disabled:opacity-50 font-medium"
            >
              <RefreshCw className={`w-5 h-5 ${generating ? 'animate-spin' : ''}`} />
              {generating ? 'Génération...' : 'Régénérer'}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-gray-900">{stats?.total || 0}</p>
              <p className="text-xs text-gray-600">Total</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-700">{stats?.pending || 0}</p>
              <p className="text-xs text-blue-600">En attente</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-700">{stats?.implemented || 0}</p>
              <p className="text-xs text-green-600">Implémentées</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-gray-700">{stats?.dismissed || 0}</p>
              <p className="text-xs text-gray-600">Ignorées</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {[
              { id: 'all', label: 'Toutes' },
              { id: 'urgent', label: 'Urgentes' },
              { id: 'high', label: 'Élevées' },
              { id: 'medium', label: 'Moyennes' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  filter === f.id
                    ? 'bg-amber-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="p-4 md:p-6 space-y-4">
        {filteredRecommendations.length === 0 ? (
          <div className="text-center py-20">
            <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">Aucune recommandation</p>
            <p className="text-sm text-gray-400">Générez des recommandations pour commencer</p>
          </div>
        ) : (
          filteredRecommendations.map((rec) => {
            const Icon = getTypeIcon(rec.type)
            return (
              <div
                key={rec.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${getTypeColor(rec.type)}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-gray-900 text-lg">
                          {rec.title}
                        </h3>
                        {getPriorityBadge(rec.priority)}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                      
                      {/* Impact */}
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-600">
                          Impact: {rec.estimatedImpact}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions suggérées */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">
                      Actions suggérées :
                    </p>
                    <ul className="space-y-2">
                      {rec.suggestedActions.map((action, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => implementRecommendation(rec.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Implémenté
                    </button>
                    <button
                      onClick={() => dismissRecommendation(rec.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      Ignorer
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}