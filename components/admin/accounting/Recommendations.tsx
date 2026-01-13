// components/admin/accounting/Recommendations.tsx
'use client';

import { TrendingUp, AlertTriangle } from 'lucide-react';

interface Recommendation {
  icon: 'success' | 'warning';
  title: string;
  description: string;
}

interface RecommendationsProps {
  recommendations: Recommendation[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  return (
    <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
      <h3 className="font-bold text-gray-900 mb-4">💡 Recommandations d'optimisation</h3>
      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div key={index} className="p-4 bg-white rounded-xl">
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                rec.icon === 'success' ? 'bg-green-100' : 'bg-orange-100'
              }`}>
                {rec.icon === 'success' ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{rec.title}</p>
                <p className="text-xs text-gray-600 mt-1">{rec.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}