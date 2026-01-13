import { ConnectForm } from '@/components/whatsapp/connectForm';
import { StatusBadge } from '@/components/whatsapp/StatusBadge';

export default function ConnectPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Connexion WhatsApp</h1>
        <p className="text-sm text-gray-600 mt-1">
          Connectez votre compte WhatsApp au bot
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ConnectForm />
      </div>

      {/* Warning Box */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <p className="text-sm font-semibold text-orange-900 mb-2">
          ⚠️ Important
        </p>
        <ul className="text-sm text-orange-800 space-y-1">
          <li>• Assurez-vous d'avoir accès à votre téléphone</li>
          <li>• La connexion remplace toute session active</li>
          <li>• Le code expire après quelques minutes</li>
          <li>• Votre numéro doit être actif sur WhatsApp</li>
        </ul>
      </div>
    </div>
  );
}