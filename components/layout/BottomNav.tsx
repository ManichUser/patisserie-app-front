// src/components/layout/BottomNav.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Heart, User, Store } from 'lucide-react';
import { clsx } from 'clsx';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
}

export const BottomNav: React.FC = () => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-6 h-6" />,
      path: '/home',
    },
    {
      id: 'explore',
      label: 'Explore',
      icon:  <Store className="w-6 h-6 " />,
      path: '/explore',

    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: <Heart className="w-6 h-6" />,
      path: '/favorites',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-6 h-6" />,
      path: '/user/profile',
    },
  ];

  return (
    <nav className="fixed bottom-0 rounded-t-4xl left-0 right-0 bg-white border-t border-gray-200 safe-bottom z-40">
      <div className="flex items-center justify-around max-w-7xl mx-auto px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.id}
              href={item.path}
              className={clsx(
                'relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200',
                isActive && 'bg-amber-50'
              )}
            >
              <div className="relative">
                <div className={clsx(
                  'transition-colors',
                  isActive ? 'text-amber-700' : 'text-gray-400'
                )}>
                  {item.icon}
                </div>

                {/* Badge */}
                {item.badge && item.badge > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  </div>
                )}
              </div>

              <span
                className={clsx(
                  'text-xs font-medium transition-colors',
                  isActive ? 'text-amber-700' : 'text-gray-400'
                )}
              >
                {item.label}
              </span>

              {/* Active Indicator */}
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-700 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};