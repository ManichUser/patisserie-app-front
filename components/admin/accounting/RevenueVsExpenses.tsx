// components/admin/accounting/RevenueVsExpenses.tsx
'use client';

interface ChartData {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface RevenueVsExpensesProps {
  data: ChartData[];
}

export function RevenueVsExpenses({ data }: RevenueVsExpensesProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-900 mb-6">📊 Comparaison Revenus vs Dépenses</h3>
      <div className="space-y-4">
        {data.map((day, index) => {
          const date = formatDate(day.date);
          const maxValue = Math.max(day.revenue, day.expenses);
          
          return (
            <div key={index}>
              <p className="text-sm font-medium text-gray-600 mb-2">{date}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-20 text-xs text-gray-600">Revenus</div>
                  <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                    <div
                      className="h-full bg-green-500 rounded-lg flex items-center justify-end pr-3"
                      style={{ width: `${(day.revenue / maxValue) * 100}%` }}
                    >
                      <span className="text-xs font-bold text-white">{day.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 text-xs text-gray-600">Dépenses</div>
                  <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                    <div
                      className="h-full bg-red-500 rounded-lg flex items-center justify-end pr-3"
                      style={{ width: `${(day.expenses / maxValue) * 100}%` }}
                    >
                      <span className="text-xs font-bold text-white">{day.expenses.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 text-xs font-bold text-gray-900">Profit</div>
                  <div className="flex-1">
                    <span className="text-sm font-bold text-green-600">{day.profit.toLocaleString()} FCFA</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}