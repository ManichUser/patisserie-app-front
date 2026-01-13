// components/admin/dashboard/RecommendationCard.tsx
'use client';

import { AlertCircle } from 'lucide-react';

interface Recommendation {
  id: string;
  type: string;
  priority: string;
  title: string;
  description: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
}

const PRIORITY_COLORS = {
  HIGH: 'text-red-600',
  MEDIUM: 'text-orange-600',
  LOW: 'text-blue-600',
  URGENT: 'text-red-700',
};

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const priorityColor = PRIORITY_COLORS[recommendation.priority as keyof typeof PRIORITY_COLORS] || PRIORITY_COLORS.MEDIUM;

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-3">
        <div className={`mt-1 ${priorityColor}`}>
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm mb-1">
            {recommendation.title}
          </h3>
          <p className="text-sm text-gray-600">{recommendation.description}</p>
        </div>
      </div>
    </div>
  );
}