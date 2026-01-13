// app/admin/expenses/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Plus, TrendingDown, TrendingUp, DollarSign, Calendar, Download, Loader2 } from 'lucide-react';

import { ExpenseStatCard } from '@/components/admin/expenses/ExpenseStatCard';
import { ExpenseCard } from '@/components/admin/expenses/ExpenseCard';
import { ExpenseModal } from '@/components/admin/expenses/ExpenseModal';
import { ExpenseFilters } from '@/components/admin/expenses/ExpenseFilters';

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

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    isRecurring: '',
    dateFrom: '',
    dateTo: '',
  });

  const [stats, setStats] = useState({
    totalThisMonth: 0,
    totalLastMonth: 0,
    recurringMonthly: 0,
    averageDaily: 0,
  });

  useEffect(() => {
    fetchExpenses();
    fetchStats();
  }, [filters]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.search) queryParams.set('search', filters.search);
      if (filters.category) queryParams.set('category', filters.category);
      if (filters.isRecurring) queryParams.set('isRecurring', filters.isRecurring);
      if (filters.dateFrom) queryParams.set('dateFrom', filters.dateFrom);
      if (filters.dateTo) queryParams.set('dateTo', filters.dateTo);

      const response = await fetch(`/api/expenses?${queryParams}`);
      const data = await response.json();
      setExpenses(data || []);
    } catch (error) {
      console.error('Erreur chargement dépenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/expenses/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    }
  };

  const handleSave = async (formData: any) => {
    try {
      const method = selectedExpense ? 'PATCH' : 'POST';
      const url = selectedExpense
        ? `/api/expenses/${selectedExpense.id}`
        : '/api/expenses';

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
        }),
      });

      await fetchExpenses();
      await fetchStats();
      setIsModalOpen(false);
      setSelectedExpense(null);
    } catch (error) {
      console.error('Erreur sauvegarde dépense:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette dépense ?')) return;

    try {
      await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
      await fetchExpenses();
      await fetchStats();
    } catch (error) {
      console.error('Erreur suppression dépense:', error);
    }
  };

  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: '',
      isRecurring: '',
      dateFrom: '',
      dateTo: '',
    });
  };

  const handleExport = async () => {
    try {
      const response = await fetch('/api/expenses/export');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `depenses-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erreur export:', error);
    }
  };

  const trend = stats.totalLastMonth > 0
    ? ((stats.totalThisMonth - stats.totalLastMonth) / stats.totalLastMonth * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestion des dépenses</h1>
              <p className="text-sm text-gray-600 mt-0.5">
                Suivez et analysez toutes vos dépenses
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleExport}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-5 py-3 rounded-xl transition-all flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Exporter
              </button>

              <button
                onClick={() => {
                  setSelectedExpense(null);
                  setIsModalOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                <Plus className="w-5 h-5" />
                Nouvelle dépense
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ExpenseStatCard
            label="Dépenses ce mois"
            value={`${stats.totalThisMonth.toLocaleString()} FCFA`}
            icon={DollarSign}
            variant="danger"
            trend={{
              value: Math.abs(Math.round(trend)),
              isPositive: trend < 0,
            }}
          />

          <ExpenseStatCard
            label="Mois dernier"
            value={`${stats.totalLastMonth.toLocaleString()} FCFA`}
            icon={Calendar}
            variant="default"
          />

          <ExpenseStatCard
            label="Récurrentes mensuelles"
            value={`${stats.recurringMonthly.toLocaleString()} FCFA`}
            icon={TrendingUp}
            variant="warning"
          />

          <ExpenseStatCard
            label="Moyenne quotidienne"
            value={`${stats.averageDaily.toLocaleString()} FCFA`}
            icon={TrendingDown}
            variant="default"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filtres */}
          <div className={`lg:col-span-1 ${showFilters ? '' : 'hidden lg:block'}`}>
            <ExpenseFilters
              filters={filters}
              onFiltersChange={setFilters}
              onReset={handleResetFilters}
            />
          </div>

          {/* Liste des dépenses */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Toutes les dépenses ({expenses.length})
              </h2>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-xl transition-colors"
              >
                {showFilters ? 'Masquer filtres' : 'Afficher filtres'}
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Chargement des dépenses...</p>
              </div>
            ) : expenses.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Aucune dépense trouvée
                </h3>
                <p className="text-gray-600 mb-6">
                  {filters.search || filters.category || filters.isRecurring
                    ? 'Essayez de modifier vos filtres'
                    : 'Commencez par ajouter votre première dépense'
                  }
                </p>
                {!filters.search && !filters.category && !filters.isRecurring && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors inline-flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Ajouter une dépense
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {expenses.map(expense => (
                  <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onViewReceipt={(url) => window.open(url, '_blank')}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <ExpenseModal
        isOpen={isModalOpen}
        expense={selectedExpense}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedExpense(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}