'use client';

import { useState } from 'react';
import { Image, Video, Radio } from 'lucide-react';
import { StatusPublisher } from '@/components/whatsapp/StatusPublisher';

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<'status'>('status');

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Médias & Statuts</h1>
        <p className="text-sm text-gray-600 mt-1">
          Publiez des statuts WhatsApp (Stories)
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('status')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'status'
                  ? 'text-blue-700 bg-blue-50 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>Statut WhatsApp</span>
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'status' && <StatusPublisher />}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <p className="text-sm font-semibold text-purple-900 mb-2">
          📢 À propos des statuts
        </p>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Visibles par tous vos contacts pendant 24 heures</li>
          <li>• Supports : texte, image (max 5MB), vidéo (max 16MB)</li>
          <li>• Les statuts texte peuvent avoir un fond coloré</li>
          <li>• Les médias peuvent inclure une légende</li>
        </ul>
      </div>
    </div>
  );
}