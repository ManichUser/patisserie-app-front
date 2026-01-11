// src/app/profile/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  MapPin,
  CreditCard,
  Bell,
  ShoppingBag,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  Camera,
  LayoutDashboard
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { BottomNav } from '@/components/layout/BottomNav';

export default function ProfilePage() {
  const router = useRouter();
  const [user] = useState({
    name: 'Jenny Wilson',
    email: 'jenny.wilson@example.com',
    phone: '+237 699 999 999',
  });

  const menuItems = [
    {
      icon: <User className="w-5 h-5" />,
      label: 'Edit Profile',
      path: '/profile/edit',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Addresses',
      path: '/profile/addresses',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: 'Payment Methods',
      path: '/profile/payment',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      label: 'Order History',
      path: '/profile/orders',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: 'Notifications',
      path: '/profile/notifications',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: 'Gerer ma Boutique ',
      path: '/dashboard',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: 'Settings',
      path: '/profile/settings',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      label: 'Help & Support',
      path: '/profile/help',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
    },
  ];

  const handleLogout = () => {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      localStorage.clear();
      router.push('/auth/login');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-linear-to-br from-amber-700 to-amber-800 pt-12 pb-32 px-6">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative mb-4">
            <div className="ring-4 ring-white rounded-full">
              <Avatar email={user.email} name={user.name} size="xl" />
            </div>
            <button 
              onClick={() => router.push('/profile/edit')}
              className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
            >
              <Camera className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          {/* User Info */}
          <h1 className="text-2xl font-bold text-white mb-1">{user.name}</h1>
          <p className="text-amber-100 mb-1">{user.email}</p>
          <p className="text-amber-100">{user.phone}</p>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="px-6 -mt-20 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="grid grid-cols-3 divide-x divide-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-500">Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-sm text-gray-500">Favorites</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">4.9</p>
              <p className="text-sm text-gray-500">Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 space-y-3">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => router.push(item.path)}
            className="w-full flex items-center gap-4 bg-white rounded-2xl p-4 hover:shadow-md transition-all duration-200 active:scale-98"
          >
            <div className={`w-12 h-12 ${item.bgColor} rounded-xl flex items-center justify-center shrink-0`}>
              <div className={item.color}>
                {item.icon}
              </div>
            </div>

            <span className="flex-1 text-left font-semibold text-gray-900">
              {item.label}
            </span>

            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 bg-white rounded-2xl p-4 hover:shadow-md transition-all duration-200 active:scale-98 border-2 border-red-100"
        >
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0">
            <LogOut className="w-5 h-5 text-red-600" />
          </div>

          <span className="flex-1 text-left font-semibold text-red-600">
            Logout
          </span>

          <ChevronRight className="w-5 h-5 text-red-400" />
        </button>
      </div>

      {/* Version */}
      <div className="text-center py-6 text-sm text-gray-400">
        BizSmart Version 1.0.0
      </div>

      {/* Navigation */}
      <BottomNav />
    </main>
  );
}