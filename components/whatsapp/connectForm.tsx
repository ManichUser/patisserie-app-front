'use client';

import { useState } from 'react';
import { Smartphone, Loader2, AlertCircle } from 'lucide-react';
import { PairingCodeDisplay } from './PairingCodeDisplay';

export function ConnectForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pairingCode, setPairingCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const cleanPhone = phoneNumber.replace(/\D/g, '');
      
      if (cleanPhone.length < 10) {
        throw new Error('Numéro de téléphone invalide');
      }

      const res = await fetch('/api/whatsapp/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: cleanPhone }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erreur de connexion');
      }

      setPairingCode(data.pairingCode);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Si code généré, afficher le résultat
  if (pairingCode) {
    return (
      <div className="space-y-4">
        <PairingCodeDisplay code={pairingCode} phoneNumber={phoneNumber} />
        
        <button
          onClick={() => {
            setPairingCode('');
            setPhoneNumber('');
          }}
          className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Nouvelle connexion
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Phone Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Numéro de téléphone
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Smartphone className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="237697839130"
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            disabled={loading}
            required
          />
        </div>
        <p className="text-xs text-gray-600 mt-2">
          Format international sans le + (ex: 237697839130)
        </p>
      </div>

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
        disabled={loading || !phoneNumber}
        className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Génération du code...</span>
          </>
        ) : (
          <span>Générer le code de connexion</span>
        )}
      </button>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900 font-medium mb-2">
          ℹ️ Comment ça marche ?
        </p>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Entrez votre numéro WhatsApp</li>
          <li>• Un code à 8 chiffres sera généré</li>
          <li>• Saisissez-le dans WhatsApp (Appareils connectés)</li>
          <li>• La connexion est établie en quelques secondes</li>
        </ul>
      </div>
    </form>
  );
}