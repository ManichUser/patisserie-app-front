'use client';

import { useState } from 'react';
import { Send, Loader2, AlertCircle } from 'lucide-react';
import { RecipientsList } from './RecipientsList';
import { SendReport } from './SendReport';

export function BulkMessageForm() {
  const [recipients, setRecipients] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [report, setReport] = useState<any>(null);

  const charCount = message.length;
  const maxChars = 4096;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (recipients.length === 0) {
        throw new Error('Ajoutez au moins un destinataire');
      }

      const res = await fetch('/api/whatsapp/send-bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipients, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erreur d\'envoi');
      }

      setReport(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseReport = () => {
    setReport(null);
    setRecipients([]);
    setMessage('');
  };

  // Show report after send
  if (report) {
    return <SendReport {...report} onClose={handleCloseReport} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Recipients */}
      <RecipientsList recipients={recipients} onChange={setRecipients} />

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Message à envoyer
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrivez votre message groupé..."
          rows={6}
          maxLength={maxChars}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
          disabled={loading}
          required
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-600">
            Le même message sera envoyé à tous les destinataires
          </p>
          <span className={`text-xs font-medium ${
            charCount > maxChars * 0.9 ? 'text-orange-600' : 'text-gray-500'
          }`}>
            {charCount} / {maxChars}
          </span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-900">Erreur</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || recipients.length === 0 || !message}
        className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Envoi en cours...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Envoyer à {recipients.length} destinataire(s)</span>
          </>
        )}
      </button>

      {/* Warning */}
      {recipients.length > 10 && (
        <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-orange-900">Attention</p>
            <p className="text-sm text-orange-700 mt-1">
              L'envoi à {recipients.length} destinataires prendra environ {Math.ceil(recipients.length * 1.5 / 60)} minute(s)
            </p>
          </div>
        </div>
      )}
    </form>
  );
}