// components/admin/accounting/TopProducts.tsx
'use client';

interface Product {
  name: string;
  sales: number;
  profit: number;
  margin: number;
}

interface TopProductsProps {
  products: Product[];
}

export function TopProducts({ products }: TopProductsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-900 mb-4">📦 Top 5 Produits les plus rentables</h3>
      <div className="space-y-3">
        {products.map((product, index) => (
          <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-blue-700 text-sm">#{index + 1}</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
              <p className="text-xs text-gray-600">{product.sales} ventes • Marge {product.margin}%</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600 text-sm">{product.profit.toLocaleString()} FCFA</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}