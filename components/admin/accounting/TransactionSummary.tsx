// components/admin/accounting/TransactionSummary.tsx
'use client';

import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface TransactionSummaryProps {
  summary: {
    totalSales: number;
    totalExpenses: number;
    balance: number;
    salesCount: number;
    expensesCount: number;
    totalCount: number;
  };
}

export function TransactionSummary({ summary }: TransactionSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Ventes</p>
            <p className="text-2xl font-bold text-green-600">
              {summary.totalSales.toLocaleString()} FCFA
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-600">{summary.salesCount} transaction(s)</p>
      </div>

      <div className="bg-red-50 rounded-2xl p-6 border-2 border-red-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
            <TrendingDown className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Dépenses</p>
            <p className="text-2xl font-bold text-red-600">
              {summary.totalExpenses.toLocaleString()} FCFA
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-600">{summary.expensesCount} transaction(s)</p>
      </div>

      <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Solde Net</p>
            <p className={`text-2xl font-bold ${
              summary.balance >= 0 ? 'text-blue-600' : 'text-red-600'
            }`}>
              {summary.balance.toLocaleString()} FCFA
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-600">{summary.totalCount} transaction(s)</p>
      </div>
    </div>
  );
}