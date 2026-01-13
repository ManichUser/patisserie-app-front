// hooks/useAccounting.ts
import { useState, useMemo } from 'react';

export function useAccounting(period: string) {
  // Mock data - à remplacer par fetch API
  const [stats] = useState({
    totalRevenue: 850000,
    totalExpenses: 420000,
    totalProfit: 430000,
    profitMargin: 50.6,
    totalSales: 156,
    averageOrderValue: 5450,
  });

  const [chartData] = useState([
    { date: '2026-01-07', revenue: 120000, expenses: 58000, profit: 62000 },
    { date: '2026-01-08', revenue: 135000, expenses: 62000, profit: 73000 },
    { date: '2026-01-09', revenue: 118000, expenses: 55000, profit: 63000 },
    { date: '2026-01-10', revenue: 142000, expenses: 68000, profit: 74000 },
    { date: '2026-01-11', revenue: 128000, expenses: 60000, profit: 68000 },
    { date: '2026-01-12', revenue: 155000, expenses: 72000, profit: 83000 },
    { date: '2026-01-13', revenue: 152000, expenses: 65000, profit: 87000 },
  ]);

  const [transactions, setTransactions] = useState([
    { id: '1', type: 'SALE' as const, description: 'Vente #CMD-156', amount: 8500, date: new Date().toISOString(), category: 'Gâteaux' },
    { id: '2', type: 'EXPENSE' as const, description: 'Achat matières premières', amount: 25000, date: new Date().toISOString(), category: 'Matières premières' },
    { id: '3', type: 'SALE' as const, description: 'Vente #CMD-155', amount: 12000, date: new Date().toISOString(), category: 'Cupcakes' },
    { id: '4', type: 'EXPENSE' as const, description: 'Livraison', amount: 3500, date: new Date().toISOString(), category: 'Livraison' },
    { id: '5', type: 'SALE' as const, description: 'Vente manuelle - Marie', amount: 6500, date: new Date().toISOString(), category: 'Vente directe' },
  ]);

  const [salesBreakdown] = useState([
    { category: 'Gâteaux', count: 68, revenue: 420000, profit: 168000, margin: 40 },
    { category: 'Cupcakes', count: 45, revenue: 225000, profit: 112500, margin: 50 },
    { category: 'Tartes', count: 32, revenue: 160000, profit: 64000, margin: 40 },
    { category: 'Macarons', count: 11, revenue: 45000, profit: 27000, margin: 60 },
  ]);

  const paymentMethods = [
    { method: 'Espèces', icon: '💵', count: 68, amount: 420000, percentage: 49 },
    { method: 'Mobile Money', icon: '📱', count: 88, amount: 430000, percentage: 51 },
  ];

  const topProducts = [
    { name: 'Gâteau Chocolat', sales: 45, profit: 180000, margin: 46 },
    { name: 'Cheesecake Passion', sales: 38, profit: 152000, margin: 52 },
    { name: 'Red Velvet', sales: 32, profit: 128000, margin: 48 },
    { name: 'Tarte Citron', sales: 28, profit: 98000, margin: 42 },
    { name: 'Macarons', sales: 25, profit: 87500, margin: 60 },
  ];

  const recommendations = [
    {
      icon: 'success' as const,
      title: 'Les Macarons ont la meilleure marge (60%)',
      description: 'Augmentez leur production pour maximiser les profits',
    },
    {
      icon: 'warning' as const,
      title: 'Les Gâteaux génèrent le plus de revenu',
      description: 'Concentrez vos efforts marketing sur cette catégorie',
    },
  ];

  // Transaction filters
  const [transactionFilters, setTransactionFilters] = useState({
    type: 'all',
    search: '',
    dateFrom: '',
    dateTo: '',
    minAmount: '',
    maxAmount: '',
    category: '',
  });

  // Filtrage des transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      if (transactionFilters.type !== 'all' && transaction.type !== transactionFilters.type) {
        return false;
      }

      if (transactionFilters.search) {
        const searchLower = transactionFilters.search.toLowerCase();
        const descriptionMatch = transaction.description.toLowerCase().includes(searchLower);
        const categoryMatch = transaction.category?.toLowerCase().includes(searchLower);
        if (!descriptionMatch && !categoryMatch) {
          return false;
        }
      }

      if (transactionFilters.category && transaction.category !== transactionFilters.category) {
        return false;
      }

      if (transactionFilters.dateFrom) {
        const transactionDate = new Date(transaction.date);
        const filterDate = new Date(transactionFilters.dateFrom);
        if (transactionDate < filterDate) {
          return false;
        }
      }

      if (transactionFilters.dateTo) {
        const transactionDate = new Date(transaction.date);
        const filterDate = new Date(transactionFilters.dateTo);
        filterDate.setHours(23, 59, 59, 999);
        if (transactionDate > filterDate) {
          return false;
        }
      }

      if (transactionFilters.minAmount && transaction.amount < parseFloat(transactionFilters.minAmount)) {
        return false;
      }

      if (transactionFilters.maxAmount && transaction.amount > parseFloat(transactionFilters.maxAmount)) {
        return false;
      }

      return true;
    });
  }, [transactions, transactionFilters]);

  // Calcul du résumé
  const filteredTransactionsSummary = useMemo(() => {
    const summary = filteredTransactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'SALE') {
          acc.totalSales += transaction.amount;
          acc.salesCount += 1;
        } else {
          acc.totalExpenses += transaction.amount;
          acc.expensesCount += 1;
        }
        acc.totalCount += 1;
        return acc;
      },
      { totalSales: 0, totalExpenses: 0, balance: 0, salesCount: 0, expensesCount: 0, totalCount: 0 }
    );

    summary.balance = summary.totalSales - summary.totalExpenses;
    return summary;
  }, [filteredTransactions]);

  // Vérifier si des filtres sont actifs
  const hasActiveFilters = 
    transactionFilters.type !== 'all' ||
    transactionFilters.search !== '' ||
    transactionFilters.dateFrom !== '' ||
    transactionFilters.dateTo !== '' ||
    transactionFilters.minAmount !== '' ||
    transactionFilters.maxAmount !== '' ||
    transactionFilters.category !== '';

  const handleResetFilters = () => {
    setTransactionFilters({
      type: 'all',
      search: '',
      dateFrom: '',
      dateTo: '',
      minAmount: '',
      maxAmount: '',
      category: '',
    });
  };

  const handleManualSale = async (data: any) => {
    const newTransaction = {
      id: Date.now().toString(),
      type: 'SALE' as const,
      description: `Vente manuelle - ${data.customerName}`,
      amount: data.items.reduce((sum: number, item: any) => sum + (item.unitPrice * item.quantity), 0),
      date: data.saleDate,
      category: 'Vente directe',
    };
    
    setTransactions([newTransaction, ...transactions]);
    alert('✅ Vente enregistrée avec succès');
  };

  const handleExport = () => {
    alert('Export général en cours...');
  };

  const handleExportTransactions = () => {
    const headers = ['Date', 'Type', 'Description', 'Catégorie', 'Montant'];
    const rows = filteredTransactions.map(t => [
      new Date(t.date).toLocaleDateString('fr-FR'),
      t.type === 'SALE' ? 'Vente' : 'Dépense',
      t.description,
      t.category || '-',
      t.amount.toString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return {
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
  };
}