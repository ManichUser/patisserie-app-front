'use client';

import { useState } from 'react';
import { Calendar, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface ScheduleFormProps {
  onSuccess?: () => void;
}

export function ScheduleForm({ onSuccess }: ScheduleFormProps) {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [scheduleInMinutes, setScheduleInMinutes] = useState(5);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch('/api/whatsapp/scheduler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          scheduleInMinutes,
          recipients: [
            { recipient, type: 'PRIVATE' }
          ],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erreur de programmation');
      }

      setSuccess(true);
      onSuccess?.();

      setTimeout(() => {
        setRecipient('');
        setMessage('');
        setScheduleInMinutes(5);
        setSuccess(false);
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Recipient */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Destinataire
        </label>
        <input
          type="tel"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="237697839130"
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          disabled={loading}
          required
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message à envoyer..."
          rows={4}
          maxLength={4096}
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
          disabled={loading}
          required
        />
        <p className="text-xs text-gray-600 mt-2">
          {message.length} / 4096 caractères
        </p>
      </div>

      {/* Schedule Time */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Programmer dans
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[1, 5, 15, 30, 60, 120, 360, 1440].map((mins) => (
            <button
              key={mins}
              type="button"
              onClick={() => setScheduleInMinutes(mins)}
              className={`px-3 py-2 text-sm font-medium rounded-lg border-2 transition-colors ${
                scheduleInMinutes === mins
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              {mins < 60 ? `${mins}m` : mins === 60 ? '1h' : mins === 120 ? '2h' : mins === 360 ? '6h' : '24h'}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-2">
          Envoi prévu à {new Date(Date.now() + scheduleInMinutes * 60 * 1000).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      {/* Success */}
      {success && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-sm font-medium text-green-900">Message programmé !</p>
        </div>
      )}

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
        disabled={loading || !recipient || !message}
        className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Programmation...</span>
          </>
        ) : (
          <>
            <Calendar className="w-5 h-5" />
            <span>Programmer</span>
          </>
        )}
      </button>
    </form>
  );
}