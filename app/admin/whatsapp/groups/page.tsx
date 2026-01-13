'use client';

import { useState, useEffect } from 'react';
import { GroupsList } from '@/components/whatsapp/GroupsList';
import { GroupDetailsModal } from '@/components/whatsapp/GroupDetailsModal';
import { RefreshCw, Download, Send, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [sendingTo, setSendingTo] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState('');

  const fetchGroups = async () => {
    try {
      const res = await fetch('/api/whatsapp/groups');
      const data = await res.json();
      setGroups(data.data || []);
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/whatsapp/groups/sync', {
        method: 'POST',
      });
      const data = await res.json();
      
      if (res.ok) {
        await fetchGroups();
        alert(data.message || 'Groupes synchronisés');
      }
    } catch (error) {
      alert('Erreur lors de la synchronisation');
    } finally {
      setSyncing(false);
    }
  };

  const handleSendMessage = async () => {
    if (!sendingTo || !message.trim()) return;

    setSendSuccess(false);
    setSendError('');

    try {
      const res = await fetch('/api/whatsapp/groups/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupJid: sendingTo,
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erreur d\'envoi');
      }

      setSendSuccess(true);
      setTimeout(() => {
        setMessage('');
        setSendingTo(null);
        setSendSuccess(false);
      }, 2000);
    } catch (err: any) {
      setSendError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
          <p className="text-sm text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Groupes WhatsApp</h1>
          <p className="text-sm text-gray-600 mt-1">
            {groups.length} groupe(s) disponible(s)
          </p>
        </div>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
        >
          {syncing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Synchronisation...</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Synchroniser</span>
            </>
          )}
        </button>
      </div>

      {/* Groups List */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <GroupsList
          groups={groups}
          onViewDetails={setSelectedGroup}
          onSendMessage={setSendingTo}
        />
      </div>

      {/* Details Modal */}
      {selectedGroup && (
        <GroupDetailsModal
          jid={selectedGroup}
          onClose={() => setSelectedGroup(null)}
        />
      )}

      {/* Send Message Modal */}
      {sendingTo && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Envoyer au groupe</h2>
              <button
                onClick={() => {
                  setSendingTo(null);
                  setMessage('');
                  setSendError('');
                }}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Écrivez votre message..."
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                  autoFocus
                />
              </div>

              {sendSuccess && (
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm font-medium text-green-900">Message envoyé !</p>
                </div>
              )}

              {sendError && (
                <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Erreur</p>
                    <p className="text-sm text-red-700 mt-0.5">{sendError}</p>
                  </div>
                </div>
              )}

              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                <span>Envoyer</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-semibold text-blue-900 mb-2">
          💡 À savoir
        </p>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Cliquez sur "Synchroniser" pour récupérer vos groupes WhatsApp</li>
          <li>• Vous pouvez voir les participants et admins de chaque groupe</li>
          <li>• Envoyez des messages directement depuis cette interface</li>
          <li>• La recherche fonctionne sur le nom et la description</li>
        </ul>
      </div>
    </div>
  );
}