// src/app/profile/settings/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Globe, Moon, Lock, Trash2, ChevronRight } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('fr');

  const handleClearCache = () => {
    if (confirm('Êtes-vous sûr de vouloir vider le cache ?')) {
      console.log('Cache cleared');
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('⚠️ Cette action est irréversible. Voulez-vous vraiment supprimer votre compte ?')) {
      console.log('Account deletion requested');
      router.push('/auth/login');
    }
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
          <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* Appearance */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Appearance</h2>
          </div>
          
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Moon className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Dark Mode</h3>
                <p className="text-sm text-gray-500">Switch to dark theme</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                darkMode ? 'bg-amber-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Language */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Language</h2>
          </div>
          
          <button
            onClick={() => router.push('/profile/settings/language')}
            className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-700" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">App Language</h3>
                <p className="text-sm text-gray-500">Français</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Security</h2>
          </div>
          
          <button
            onClick={() => router.push('/profile/settings/change-password')}
            className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-purple-700" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Change Password</h3>
                <p className="text-sm text-gray-500">Update your password</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Data & Storage */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Data & Storage</h2>
          </div>
          
          <button
            onClick={handleClearCache}
            className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Clear Cache</h3>
              <p className="text-sm text-gray-500">Free up storage space</p>
            </div>
            <span className="text-sm text-gray-500">2.3 MB</span>
          </button>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border-2 border-red-100">
          <div className="px-5 py-4 border-b border-red-100">
            <h2 className="font-bold text-red-600">Danger Zone</h2>
          </div>
          
          <button
            onClick={handleDeleteAccount}
            className="w-full p-5 flex items-center justify-between hover:bg-red-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-700" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-red-600">Delete Account</h3>
                <p className="text-sm text-red-500">Permanently delete your account</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-red-400" />
          </button>
        </div>
      </div>
    </main>
  );
}