import { BulkMessageForm } from '@/components/whatsapp/BulkMessageForm';

export default function BulkPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Envoi Groupé</h1>
        <p className="text-sm text-gray-600 mt-1">
          Envoyez le même message à plusieurs destinataires
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <BulkMessageForm />
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-semibold text-blue-900 mb-2">
          💡 Fonctionnement
        </p>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Les messages sont envoyés un par un avec un délai de 1 seconde</li>
          <li>• Un rapport détaillé est affiché à la fin</li>
          <li>• Les échecs n'empêchent pas l'envoi aux autres</li>
          <li>• Vous pouvez importer plusieurs numéros d'un coup</li>
        </ul>
      </div>
    </div>
  );
}