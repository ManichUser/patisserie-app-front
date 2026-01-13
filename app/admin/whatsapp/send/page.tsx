'use client';

import { useState } from 'react';
import { MessageForm } from '@/components/whatsapp/MessageForm';
import { RecentMessages } from '@/components/whatsapp/RecentMessages';

interface Message {
  to: string;
  message: string;
  timestamp: number;
}

export default function SendPage() {
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);

  const handleSuccess = (data: { to: string; message: string }) => {
    const newMessage: Message = {
      ...data,
      timestamp: Date.now(),
    };
    
    setRecentMessages((prev) => [newMessage, ...prev].slice(0, 10));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Envoyer un message</h1>
        <p className="text-sm text-gray-600 mt-1">
          Envoyez un message WhatsApp à un destinataire
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Nouveau message</h2>
          <MessageForm onSuccess={handleSuccess} />
        </div>

        {/* Recent Messages Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Messages récents</h2>
          <RecentMessages messages={recentMessages} />
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-semibold text-blue-900 mb-2">
          💡 Conseils
        </p>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Vérifiez que le numéro est actif sur WhatsApp</li>
          <li>• Utilisez le format international (ex: 237697839130)</li>
          <li>• Les emojis sont supportés 😊</li>
          <li>• Maximum 4096 caractères par message</li>
        </ul>
      </div>
    </div>
  );
}