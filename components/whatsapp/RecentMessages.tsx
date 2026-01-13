'use client';

import { CheckCircle, Clock } from 'lucide-react';

interface Message {
  to: string;
  message: string;
  timestamp: number;
}

interface RecentMessagesProps {
  messages: Message[];
}

export function RecentMessages({ messages }: RecentMessagesProps) {
  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-sm font-medium text-gray-900">Aucun message récent</p>
        <p className="text-xs text-gray-600 mt-1">Vos derniers envois apparaîtront ici</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((msg, index) => (
        <div
          key={index}
          className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="text-sm font-semibold text-gray-900">{msg.to}</span>
            </div>
            <span className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <p className="text-sm text-gray-700 line-clamp-2">{msg.message}</p>
        </div>
      ))}
    </div>
  );
}