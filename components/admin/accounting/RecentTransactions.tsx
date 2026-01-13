// components/admin/accounting/RecentTransactions.tsx
'use client';

import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'SALE' | 'EXPENSE';
  description: string;
  amount: number;
  date: string;
  category?: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            transaction.type === 'SALE' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {transaction.type === 'SALE' ? (
              <ArrowUpRight className="w-5 h-5 text-green-600" />
            ) : (
              <ArrowDownRight className="w-5 h-5 text-red-600" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">
              {transaction.description}
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs text-gray-500">
                {formatDate(transaction.date)}
              </p>
              {transaction.category && (
                <>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{transaction.category}</span>
                </>
              )}
            </div>
          </div>

          <div className="text-right">
            <p className={`font-bold text-sm ${
              transaction.type === 'SALE' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.type === 'SALE' ? '+' : '-'}{transaction.amount.toLocaleString()} FCFA
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}