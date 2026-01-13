// components/admin/accounting/FinancialChart.tsx
'use client';

interface ChartData {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface FinancialChartProps {
  data: ChartData[];
  type: 'revenue' | 'profit' | 'expenses';
}

export function FinancialChart({ data, type }: FinancialChartProps) {
  const getColor = () => {
    switch (type) {
      case 'revenue': return { bg: 'bg-blue-600', text: 'text-blue-600' };
      case 'profit': return { bg: 'bg-green-600', text: 'text-green-600' };
      case 'expenses': return { bg: 'bg-red-600', text: 'text-red-600' };
    }
  };

  const getValue = (item: ChartData) => {
    switch (type) {
      case 'revenue': return item.revenue;
      case 'profit': return item.profit;
      case 'expenses': return item.expenses;
    }
  };

  const getLabel = () => {
    switch (type) {
      case 'revenue': return 'Revenus';
      case 'profit': return 'Profit';
      case 'expenses': return 'Dépenses';
    }
  };

  const maxValue = Math.max(...data.map(getValue));
  const color = getColor();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div>
      <h3 className="font-bold text-gray-900 mb-4">{getLabel()}</h3>
      <div className="space-y-3">
        {data.map((item, index) => {
          const value = getValue(item);
          const percentage = maxValue > 0 ? (value / maxValue * 100) : 0;

          return (
            <div key={index}>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-gray-600 font-medium">{formatDate(item.date)}</span>
                <span className={`font-bold ${color.text}`}>
                  {value.toLocaleString()} FCFA
                </span>
              </div>
              <div className="relative">
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${color.bg} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}