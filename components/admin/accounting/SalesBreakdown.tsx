// components/admin/accounting/SalesBreakdown.tsx
'use client';

interface CategorySale {
  category: string;
  count: number;
  revenue: number;
  profit: number;
  margin: number;
}

interface SalesBreakdownProps {
  sales: CategorySale[];
}

export function SalesBreakdown({ sales }: SalesBreakdownProps) {
  const maxRevenue = Math.max(...sales.map(s => s.revenue));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-900 mb-6">📦 Analyse des ventes par catégorie</h3>
      
      <div className="space-y-6">
        {sales.map((category, index) => (
          <div key={index} className="p-5 bg-gray-50 rounded-xl border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{category.category}</h4>
                <p className="text-sm text-gray-600">{category.count} ventes</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{category.revenue.toLocaleString()} FCFA</p>
                <p className="text-sm text-green-600 font-semibold">Profit: {category.profit.toLocaleString()} FCFA</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Ventes</p>
                <p className="font-bold text-gray-900">{category.count}</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Revenu</p>
                <p className="font-bold text-blue-600">{(category.revenue / 1000).toFixed(0)}K</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Profit</p>
                <p className="font-bold text-green-600">{(category.profit / 1000).toFixed(0)}K</p>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Marge</p>
                <p className={`font-bold ${
                  category.margin >= 50 ? 'text-green-600' : category.margin >= 40 ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {category.margin}%
                </p>
              </div>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${(category.revenue / maxRevenue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}