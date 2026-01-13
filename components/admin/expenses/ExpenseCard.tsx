// components/admin/expenses/ExpenseCard.tsx
'use client';

import { Edit, Trash2, Calendar, User, FileText, Repeat, Receipt } from 'lucide-react';

interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  vendor?: string;
  reference?: string;
  notes?: string;
  isRecurring: boolean;
  frequency?: string;
  receiptUrl?: string;
  expenseDate: string;
  createdAt: string;
}

interface ExpenseCardProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
  onViewReceipt?: (url: string) => void;
}

const categoryConfig: Record<string, { icon: string; color: string; bgColor: string }> = {
  RAW_MATERIALS: { icon: '🥚', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  PACKAGING: { icon: '📦', color: 'text-green-700', bgColor: 'bg-green-100' },
  DELIVERY: { icon: '🚚', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  MARKETING: { icon: '📣', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  UTILITIES: { icon: '💡', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  RENT: { icon: '🏠', color: 'text-pink-700', bgColor: 'bg-pink-100' },
  SALARIES: { icon: '💰', color: 'text-indigo-700', bgColor: 'bg-indigo-100' },
  EQUIPMENT: { icon: '🔧', color: 'text-gray-700', bgColor: 'bg-gray-100' },
  MAINTENANCE: { icon: '⚙️', color: 'text-teal-700', bgColor: 'bg-teal-100' },
  INSURANCE: { icon: '🛡️', color: 'text-cyan-700', bgColor: 'bg-cyan-100' },
  TAXES: { icon: '📊', color: 'text-red-700', bgColor: 'bg-red-100' },
  OTHER: { icon: '📝', color: 'text-gray-700', bgColor: 'bg-gray-100' },
};

const categoryLabels: Record<string, string> = {
  RAW_MATERIALS: 'Matières premières',
  PACKAGING: 'Emballage',
  DELIVERY: 'Livraison',
  MARKETING: 'Marketing',
  UTILITIES: 'Services publics',
  RENT: 'Loyer',
  SALARIES: 'Salaires',
  EQUIPMENT: 'Équipement',
  MAINTENANCE: 'Maintenance',
  INSURANCE: 'Assurance',
  TAXES: 'Taxes',
  OTHER: 'Autres',
};

const frequencyLabels: Record<string, string> = {
  DAILY: 'Quotidien',
  WEEKLY: 'Hebdomadaire',
  MONTHLY: 'Mensuel',
  YEARLY: 'Annuel',
};

export function ExpenseCard({ expense, onEdit, onDelete, onViewReceipt }: ExpenseCardProps) {
  const config = categoryConfig[expense.category] || categoryConfig.OTHER;
  const categoryLabel = categoryLabels[expense.category] || expense.category;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center shrink-0 text-2xl`}>
          {config.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {expense.description}
            </h3>
            <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${config.bgColor} ${config.color} shrink-0`}>
              {categoryLabel}
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(expense.expenseDate).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </div>
            {expense.isRecurring && expense.frequency && (
              <div className="flex items-center gap-1 text-blue-600 font-medium">
                <Repeat className="w-4 h-4" />
                {frequencyLabels[expense.frequency]}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Montant */}
      <div className="mb-4 p-4 bg-gray-50 rounded-xl">
        <p className="text-sm text-gray-600 mb-1">Montant</p>
        <p className="text-3xl font-bold text-gray-900">
          {expense.amount.toLocaleString()} <span className="text-lg text-gray-500">FCFA</span>
        </p>
      </div>

      {/* Détails */}
      <div className="space-y-2 mb-4">
        {expense.vendor && (
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Fournisseur:</span>
            <span className="font-medium text-gray-900">{expense.vendor}</span>
          </div>
        )}
        {expense.reference && (
          <div className="flex items-center gap-2 text-sm">
            <FileText className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Référence:</span>
            <span className="font-mono font-medium text-gray-900">{expense.reference}</span>
          </div>
        )}
        {expense.notes && (
          <div className="flex items-start gap-2 text-sm mt-3">
            <svg className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <p className="text-gray-600 line-clamp-2">{expense.notes}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-gray-200">
        {expense.receiptUrl && onViewReceipt && (
          <button
            onClick={() => onViewReceipt(expense.receiptUrl!)}
            className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Receipt className="w-4 h-4" />
            Reçu
          </button>
        )}
        
        <button
          onClick={() => onEdit(expense)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Modifier
        </button>

        <button
          onClick={() => onDelete(expense.id)}
          className="bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}