// app/admin/accounting/page.tsx
'use client';

import { useState } from 'react';
import { Download, Plus } from 'lucide-react';

// Composants modulaires
import { AccountingStatCard } from '@/components/admin/accounting/AccountingStatCard';
import { ManualSaleModal } from '@/components/admin/accounting/ManualSaleModal';
import { FinancialChart } from '@/components/admin/accounting/FinancialChart';
import { RecentTransactions } from '@/components/admin/accounting/RecentTransactions';
import { TransactionFilters } from '@/components/admin/accounting/TransactionFilters';
import { TransactionSummary } from '@/components/admin/accounting/TransactionSummary';
import { OverviewStats } from '@/components/admin/accounting/OverviewStats';
import { PaymentMethods } from '@/components/admin/accounting/PaymentMethods';
import { TopProducts } from '@/components/admin/accounting/TopProducts';
import { SalesBreakdown } from '@/components/admin/accounting/SalesBreakdown';
import { Recommendations } from '@/components/admin/accounting/Recommendations';
import { RevenueVsExpenses } from '@/components/admin/accounting/RevenueVsExpenses';

// Hooks personnalisés
import { useAccounting } from '@/hooks/useAccounting';

const TABS = [
  { id: 'overview', label: 'Vue d\'ensemble' },
  { id: 'evolution', label: 'Évolution' },
  { id: 'breakdown', label: 'Analyse ventes' },
  { id: 'transactions', label: 'Transactions' },
];

export default function AccountingPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [period, setPeriod] = useState('week');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hook personnalisé pour toute la logique
  const {
    stats,
    chartData,
    transactions,
    salesBreakdown,
    paymentMethods,
    topProducts,
    recommendations,
    transactionFilters,
    setTransactionFilters,
    filteredTransactions,
    filteredTransactionsSummary,
    hasActiveFilters,
    handleManualSale,
    handleResetFilters,
    handleExport,
    handleExportTransactions,
  } = useAccounting(period);

  return (
    <div className="min-h-screen max-w-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white  border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex-col items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Comptabilité</h1>
              <p className="text-sm text-gray-600 mt-0.5">
                Tableau de bord financier complet
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm font-medium"
              >
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="quarter">Ce trimestre</option>
                <option value="year">Cette année</option>
              </select>

              <button
                onClick={handleExport}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Exporter
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <Plus className="w-5 h-5" />
                Vente manuelle
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <OverviewStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <FinancialChart data={chartData} type="revenue" />
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <FinancialChart data={chartData} type="profit" />
              </div>
            </div>

            <PaymentMethods methods={paymentMethods} />
            <TopProducts products={topProducts} />
          </div>
        )}

        {/* Evolution Tab */}
        {activeTab === 'evolution' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <FinancialChart data={chartData} type="revenue" />
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <FinancialChart data={chartData} type="expenses" />
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <FinancialChart data={chartData} type="profit" />
              </div>
            </div>

            <RevenueVsExpenses data={chartData} />
          </div>
        )}

        {/* Breakdown Tab */}
        {activeTab === 'breakdown' && (
          <div className="space-y-6">
            <SalesBreakdown sales={salesBreakdown} />
            <Recommendations recommendations={recommendations} />
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            <TransactionFilters
              filters={transactionFilters}
              onFiltersChange={setTransactionFilters}
              onReset={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
            />

            <TransactionSummary summary={filteredTransactionsSummary} />

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900">
                  Transactions ({filteredTransactions.length})
                </h3>
                <button
                  onClick={handleExportTransactions}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors text-sm"
                >
                  <Download className="w-4 h-4" />
                  Exporter
                </button>
              </div>

              {filteredTransactions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">💳</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Aucune transaction trouvée
                  </h4>
                  <p className="text-gray-600">
                    Essayez de modifier vos filtres
                  </p>
                </div>
              ) : (
                <RecentTransactions transactions={filteredTransactions} />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Manual Sale Modal */}
      <ManualSaleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleManualSale}
      />
    </div>
  );
}