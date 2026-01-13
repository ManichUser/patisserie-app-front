'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface PairingCodeDisplayProps {
  code: string;
  phoneNumber: string;
}

export function PairingCodeDisplay({ code, phoneNumber }: PairingCodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
      {/* Success Icon */}
      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="w-6 h-6 text-white" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
        Code de connexion généré
      </h3>
      <p className="text-sm text-gray-600 text-center mb-6">
        Pour le numéro {phoneNumber}
      </p>

      {/* Code Display */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 text-center">
            <span className="text-4xl font-mono font-bold text-gray-900 tracking-wider">
              {code}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            title="Copier le code"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="space-y-3 text-sm text-gray-700">
        <p className="font-semibold">📱 Étapes sur WhatsApp :</p>
        <ol className="space-y-2 pl-4">
          <li className="flex gap-2">
            <span className="font-semibold flex-shrink-0">1.</span>
            <span>Ouvrez WhatsApp sur votre téléphone</span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold flex-shrink-0">2.</span>
            <span>Allez dans <strong>Paramètres → Appareils connectés</strong></span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold flex-shrink-0">3.</span>
            <span>Appuyez sur <strong>Connecter un appareil</strong></span>
          </li>
          <li className="flex gap-2">
            <span className="font-semibold flex-shrink-0">4.</span>
            <span>Entrez le code : <strong className="font-mono">{code}</strong></span>
          </li>
        </ol>
      </div>
    </div>
  );
}