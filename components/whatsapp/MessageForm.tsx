'use client';

import { useState } from 'react';
import { Send, User, MessageSquare, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface MessageFormProps {
  onSuccess?: (data: { to: string; message: string }) => void;
}

export function MessageForm({ onSuccess }: MessageFormProps) {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const charCount = message.length;
  const maxChars = 4096;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: recipient, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erreur d\'envoi');
      }

      setSuccess(true);
      onSuccess?.({ to: recipient, message });

      // Reset après 2s
      setTimeout(() => {
        setRecipient('');
        setMessage('');
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
      {/* Recipient Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Destinataire
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="tel"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="237697839130"
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            disabled={loading}
            required
          />
        </div>
        <p className="text-xs text-gray-600 mt-2">
          Numéro WhatsApp au format international (sans le +)
        </p>
      </div>

      {/* Message Textarea */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Message
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3 pointer-events-none">
            <MessageSquare className="w-5 h-5 text-gray-400" />
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            rows={6}
            maxLength={maxChars}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
            disabled={loading}
            required
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-600">
            Supporte emojis et sauts de ligne
          </p>
          <span className={`text-xs font-medium ${
            charCount > maxChars * 0.9 ? 'text-orange-600' : 'text-gray-500'
          }`}>
            {charCount} / {maxChars}
          </span>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-green-900">Message envoyé !</p>
            <p className="text-xs text-green-700 mt-0.5">Le destinataire recevra votre message dans quelques instants</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-900">Erreur</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !recipient || !message}
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
            <span>Envoyer le message</span>
          </>
        )}
      </button>
    </form>
  );
}