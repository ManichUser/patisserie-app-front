// components/admin/categories/RecommendationCard.tsx
'use client';

import { CheckCircle, ThumbsDown } from 'lucide-react';

export interface CategoryRecommendation {
  id: string;
  type: 'low-stock' | 'popular' | 'pricing' | 'new-category';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  actions: string[];
  icon: React.ReactNode;
}

interface RecommendationCardProps {
  recommendation: CategoryRecommendation;
  onImplement: (id: string) => void;
  onDismiss: (id: string) => void;
}

export function RecommendationCard({
  recommendation,
  onImplement,
  onDismiss,
}: RecommendationCardProps) {
  const priorityColors = {
    urgent: 'bg-red-100 text-red-700',
    high: 'bg-orange-100 text-orange-700',
    medium: 'bg-blue-100 text-blue-700',
    low: 'bg-gray-100 text-gray-700',
  };

  const priorityLabels = {
    urgent: 'Urgent',
    high: 'Élevée',
    medium: 'Moyenne',
    low: 'Basse',
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
            
          {recommendation.icon}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {recommendation.title}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors[recommendation.priority]}`}>
              {priorityLabels[recommendation.priority]}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed">
            {recommendation.description}
          </p>
        </div>
      </div>

      {/* Impact */}
      <div className="mb-4 flex items-start gap-2 bg-green-50 rounded-lg p-3">
        <svg className="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <p className="text-sm text-green-700 font-medium">
          Impact: {recommendation.impact}
        </p>
      </div>

      {/* Actions suggérées */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Actions suggérées :
        </h4>
        <div className="space-y-2">
          {recommendation.actions.map((action, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex gap-3">
        <button
          onClick={() => onImplement(recommendation.id)}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          Implémenté
        </button>
        
        <button
          onClick={() => onDismiss(recommendation.id)}
          className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <ThumbsDown className="w-4 h-4" />
          Ignorer
        </button>
      </div>
    </div>
  );
}