
'use client';

import { StatCardProps } from "@/lib/types";



export function StatCard({ label, value, variant = 'default' }: StatCardProps) {
  const variants = {
    default: 'bg-white',
    primary: 'bg-blue-50',
    success: 'bg-green-50',
    warning: 'bg-amber-50',
  };

  const textColors = {
    default: 'text-gray-900',
    primary: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-amber-600',
  };

  return (
    <div className={`${variants[variant]} rounded-2xl p-6 text-center`}>
      <div className={`text-4xl font-bold ${textColors[variant]} mb-1`}>
        {value}
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}