// components/admin/dashboard/QuickAction.tsx
'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface QuickActionProps {
  href: string;
  icon: LucideIcon;
  label: string;
  iconColor: string;
  iconBg: string;
}

export function QuickAction({ href, icon: Icon, label, iconColor, iconBg }: QuickActionProps) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all text-center group"
    >
      <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <p className="font-semibold text-gray-900 text-sm">{label}</p>
    </Link>
  );
}