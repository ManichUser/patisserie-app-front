'use client';

import { X, Users, Shield, User, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GroupDetailsModalProps {
  jid: string;
  onClose: () => void;
}

export function GroupDetailsModal({ jid, onClose }: GroupDetailsModalProps) {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/whatsapp/groups/${encodeURIComponent(jid)}`);
        const data = await res.json();
        setDetails(data.data);
      } catch (error) {
        console.error('Error fetching group details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [jid]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Détails du groupe</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : details ? (
            <div className="space-y-6">
              {/* Group Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Informations</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Nom</p>
                    <p className="text-sm font-medium text-gray-900">{details.name}</p>
                  </div>
                  {details.description && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Description</p>
                      <p className="text-sm text-gray-900">{details.description}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-600 mb-1">JID</p>
                    <p className="text-xs font-mono text-gray-700 bg-gray-50 px-2 py-1 rounded">
                      {details.jid}
                    </p>
                  </div>
                </div>
              </div>

              {/* Participants */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Participants</h3>
                  <span className="text-sm text-gray-600">
                    {details.participantsCount} membre(s)
                  </span>
                </div>

                <div className="max-h-64 overflow-y-auto space-y-2 border border-gray-200 rounded-lg p-3">
                  {details.participants?.map((participant: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        {participant.isAdmin ? (
                          <Shield className="w-4 h-4 text-gray-700" />
                        ) : (
                          <User className="w-4 h-4 text-gray-700" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {participant.jid.split('@')[0]}
                        </p>
                        {participant.isAdmin && (
                          <p className="text-xs text-gray-600">Administrateur</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-gray-600">Impossible de charger les détails</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}