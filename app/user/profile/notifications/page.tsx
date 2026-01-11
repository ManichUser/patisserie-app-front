// src/app/profile/notifications/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell } from 'lucide-react';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export default function NotificationsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'orders',
      label: 'Order Updates',
      description: 'Get notified about your order status',
      enabled: true,
    },
    {
      id: 'promotions',
      label: 'Promotions',
      description: 'Receive special offers and discounts',
      enabled: true,
    },
    {
      id: 'newsletter',
      label: 'Newsletter',
      description: 'Get the latest news and updates',
      enabled: false,
    },
    {
      id: 'new_products',
      label: 'New Products',
      description: 'Be the first to know about new items',
      enabled: true,
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
        </div>
      </header>

      <div className="px-6 py-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {settings.map((setting, index) => (
            <div
              key={setting.id}
              className={`flex items-center justify-between p-5 ${
                index !== settings.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{setting.label}</h3>
                <p className="text-sm text-gray-500">{setting.description}</p>
              </div>

              <button
                onClick={() => toggleSetting(setting.id)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  setting.enabled ? 'bg-amber-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    setting.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-amber-50 rounded-2xl p-5 border border-amber-100">
          <div className="flex gap-3">
            <Bell className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-1">Push Notifications</h3>
              <p className="text-sm text-amber-700">
                Enable push notifications in your device settings to receive real-time updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}