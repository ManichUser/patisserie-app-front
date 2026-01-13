// components/admin/accounting/OverviewStats.tsx
'use client';

import { DollarSign, TrendingDown, PiggyBank, ShoppingCart } from 'lucide-react';
import { AccountingStatCard } from './AccountingStatCard';

interface OverviewStatsProps {
  stats: {
    totalRevenue: number;
    totalExpenses: number;
    totalProfit: number;
    profitMargin: number;
    totalSales: number;
    averageOrderValue: number;
  };
}

export function OverviewStats({ stats }: OverviewStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <AccountingStatCard
        label="Chiffre d'affaires"
        value={`${stats.totalRevenue.toLocaleString()} FCFA`}
        icon={DollarSign}
        variant="success"
        trend={{
          value: 18,
          isPositive: true,
          label: 'vs période précédente',
        }}
      />

      <AccountingStatCard
        label="Dépenses"
        value={`${stats.totalExpenses.toLocaleString()} FCFA`}
        icon={TrendingDown}
        variant="danger"
        trend={{
          value: 12,
          isPositive: false,
        }}
      />

      <AccountingStatCard
        label="Profit net"
        value={`${stats.totalProfit.toLocaleString()} FCFA`}
        icon={PiggyBank}
        variant="info"
        subtitle={`Marge: ${stats.profitMargin}%`}
        trend={{
          value: 21,
          isPositive: true,
        }}
      />

      <AccountingStatCard
        label="Panier moyen"
        value={`${stats.averageOrderValue.toLocaleString()} FCFA`}
        icon={ShoppingCart}
        variant="default"
        subtitle={`${stats.totalSales} ventes`}
      />
    </div>
  );
}