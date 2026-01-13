// components/admin/accounting/PaymentMethods.tsx
'use client';

interface PaymentMethod {
  method: string;
  icon: string;
  count: number;
  amount: number;
  percentage: number;
}

interface PaymentMethodsProps {
  methods: PaymentMethod[];
}

export function PaymentMethods({ methods }: PaymentMethodsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-900 mb-4">💳 Répartition par méthode de paiement</h3>
      <div className="space-y-4">
        {methods.map((payment, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{payment.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900">{payment.method}</p>
                  <p className="text-sm text-gray-600">{payment.count} transactions</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{payment.amount.toLocaleString()} FCFA</p>
                <p className="text-sm text-gray-600">{payment.percentage}%</p>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${payment.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}