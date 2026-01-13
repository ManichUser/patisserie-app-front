'use client';

import { Users, Eye, Send } from 'lucide-react';

interface GroupCardProps {
  group: {
    id?: string;
    jid: string;
    name: string;
    description?: string;
    participantsCount: number;
  };
  onViewDetails?: (jid: string) => void;
  onSendMessage?: (jid: string) => void;
}

export function GroupCard({ group, onViewDetails, onSendMessage }: GroupCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 line-clamp-1">
            {group.name}
          </h3>
          {group.description && (
            <p className="text-xs text-gray-600 line-clamp-2 mt-1">
              {group.description}
            </p>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{group.participantsCount} participant(s)</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onViewDetails?.(group.jid)}
          className="flex-1 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          <span>Détails</span>
        </button>
        <button
          onClick={() => onSendMessage?.(group.jid)}
          className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>Envoyer</span>
        </button>
      </div>
    </div>
  );
}