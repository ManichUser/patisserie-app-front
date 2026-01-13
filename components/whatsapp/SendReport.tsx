'use client';

import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface SendReportProps {
  total: number;
  sent: number;
  failed: number;
  details: Array<{
    recipient: string;
    status: 'sent' | 'failed';
    error?: string;
  }>;
  onClose: () => void;
}

export function SendReport({ total, sent, failed, details, onClose }: SendReportProps) {
  const successRate = Math.round((sent / total) * 100);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-blue-900">{total}</p>
          <p className="text-xs text-blue-700 mt-1">Total</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-green-900">{sent}</p>
          <p className="text-xs text-green-700 mt-1">Envoyés</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-red-900">{failed}</p>
          <p className="text-xs text-red-700 mt-1">Échecs</p>
        </div>
      </div>

      {/* Success Rate */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Taux de succès</span>
          <span className="text-sm font-bold text-gray-900">{successRate}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${successRate}%` }}
          />
        </div>
      </div>

      {/* Details List */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Détails par destinataire</h3>
        <div className="max-h-64 overflow-y-auto space-y-2 border border-gray-200 rounded-lg p-3">
          {details.map((item, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-3 rounded-lg ${
                item.status === 'sent' ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              {item.status === 'sent' ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{item.recipient}</p>
                {item.error && (
                  <p className="text-xs text-red-700 mt-0.5">{item.error}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Terminer
        </button>
      </div>
    </div>
  );
}