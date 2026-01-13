'use client';

import { X, Users, Plus } from 'lucide-react';
import { useState } from 'react';

interface RecipientsListProps {
  recipients: string[];
  onChange: (recipients: string[]) => void;
}

export function RecipientsList({ recipients, onChange }: RecipientsListProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const cleaned = inputValue.trim().replace(/\D/g, '');
    if (cleaned && !recipients.includes(cleaned)) {
      onChange([...recipients, cleaned]);
      setInputValue('');
    }
  };

  const handleRemove = (number: string) => {
    onChange(recipients.filter((r) => r !== number));
  };

  const handleBulkAdd = () => {
    const numbers = inputValue
      .split(/[\n,;]/)
      .map((n) => n.trim().replace(/\D/g, ''))
      .filter((n) => n && !recipients.includes(n));
    
    if (numbers.length > 0) {
      onChange([...recipients, ...numbers]);
      setInputValue('');
    }
  };

  return (
    <div className="space-y-4">
      {/* Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Ajouter des destinataires
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="237697839130"
            className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-sm"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          Appuyez sur Entrée ou cliquez + pour ajouter
        </p>
      </div>

      {/* Bulk Import */}
      <div>
        <details className="group">
          <summary className="text-sm font-medium text-blue-700 cursor-pointer hover:text-blue-800">
            Import multiple (texte/CSV)
          </summary>
          <div className="mt-3 space-y-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="237697839130&#10;237688888888&#10;237677777777"
              rows={4}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
            />
            <button
              type="button"
              onClick={handleBulkAdd}
              className="text-sm text-blue-700 font-medium hover:text-blue-800"
            >
              Importer ces numéros
            </button>
          </div>
        </details>
      </div>

      {/* Recipients List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-semibold text-gray-900">
              Destinataires ({recipients.length})
            </span>
          </div>
          {recipients.length > 0 && (
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-xs text-red-600 hover:text-red-700 font-medium"
            >
              Tout effacer
            </button>
          )}
        </div>

        {recipients.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Aucun destinataire ajouté</p>
          </div>
        ) : (
          <div className="max-h-64 overflow-y-auto space-y-2 border-2 border-gray-200 rounded-lg p-3">
            {recipients.map((number) => (
              <div
                key={number}
                className="flex items-center justify-between gap-3 p-2 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900">{number}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(number)}
                  className="opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-700 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}