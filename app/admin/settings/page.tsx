// app/admin/settings/page.tsx
'use client';

import { useState } from 'react';
import { Save, Store, Bell, User, Globe, Lock, Mail, Phone, MapPin, Clock, DollarSign } from 'lucide-react';

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const [settings, setSettings] = useState({
    // Informations admin
    adminName: 'Jean Dupont',
    adminEmail: 'admin@patisserie.cm',
    adminPhone: '+237 6 XX XX XX XX',
    adminRole: 'ADMIN',
    adminAvatar: '',
    
    // Informations boutique
    storeName: 'La Pâtisserie Gourmande',
    storeEmail: 'contact@patisserie.cm',
    storePhone: '+237 6 XX XX XX XX',
    storeAddress: '123 Avenue de la République, Yaoundé',
    storeCity: 'Yaoundé',
    storeDistrict: 'Centre',
    taxId: 'M123456789',
    businessHours: 'Lun-Sam: 8h-20h, Dim: 9h-18h',
    
    // Livraison
    deliveryFee: '1500',
    freeDeliveryThreshold: '15000',
    maxDeliveryRadius: '10',
    estimatedDeliveryTime: '30-45',
    
    // Paiements
    cashOnDelivery: true,
    mobileMoneyEnabled: true,
    cardPaymentEnabled: false,
    
    // Notifications
    orderNotifications: true,
    lowStockAlerts: true,
    dailyReports: true,
    whatsappNotifications: true,
    emailNotifications: false,
    smsNotifications: false,
    
    // Préférences
    currency: 'FCFA',
    language: 'fr',
    timezone: 'Africa/Douala',
    dateFormat: 'dd/MM/yyyy',
    
    // SEO
    metaTitle: 'La Pâtisserie Gourmande - Yaoundé',
    metaDescription: 'Les meilleures pâtisseries artisanales de Yaoundé',
    metaKeywords: 'pâtisserie, gâteaux, Yaoundé, Cameroun',
    
    // Sécurité
    twoFactorAuth: false,
    sessionTimeout: '60',
    passwordExpiry: '90',
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      // TODO: await fetch('/api/settings', { method: 'PUT', body: JSON.stringify(settings) })
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('✅ Paramètres enregistrés avec succès');
    } catch (error) {
      alert('❌ Erreur lors de l\'enregistrement');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'Profil Admin', icon: User },
    { id: 'shop', label: 'Boutique', icon: Store },
    { id: 'delivery', label: 'Livraison', icon: MapPin },
    { id: 'payments', label: 'Paiements', icon: DollarSign },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
              <p className="text-sm text-gray-600 mt-0.5">
                Configurez votre boutique en ligne
              </p>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 sticky top-24">
              <nav className="space-y-1">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profil Admin */}
            {activeTab === 'general' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Informations du compte administrateur</h2>
                
                <div className="space-y-5">
                  {/* Avatar */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Photo de profil
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                        {settings.adminName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm">
                          Changer la photo
                        </button>
                        <p className="text-xs text-gray-500 mt-2">JPG, PNG ou GIF (max 2MB)</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={settings.adminName}
                      onChange={(e) => setSettings({ ...settings, adminName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={settings.adminEmail}
                          onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Téléphone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={settings.adminPhone}
                          onChange={(e) => setSettings({ ...settings, adminPhone: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Rôle
                    </label>
                    <select
                      value={settings.adminRole}
                      onChange={(e) => setSettings({ ...settings, adminRole: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 appearance-none bg-white"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        backgroundSize: '1.25rem',
                      }}
                    >
                      <option value="USER">Utilisateur</option>
                      <option value="ADMIN">Administrateur</option>
                      <option value="SUPER">Super Administrateur</option>
                    </select>
                  </div>

                  {/* Changer mot de passe */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Changer le mot de passe</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Mot de passe actuel
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Nouveau mot de passe
                          </label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Confirmer le mot de passe
                          </label>
                          <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-xl transition-colors"
                      >
                        Mettre à jour le mot de passe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Informations Boutique */}
            {activeTab === 'shop' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Informations de la boutique</h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Nom de la boutique
                    </label>
                    <input
                      type="text"
                      value={settings.storeName}
                      onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={settings.storeEmail}
                          onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Téléphone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={settings.storePhone}
                          onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Adresse
                    </label>
                    <textarea
                      value={settings.storeAddress}
                      onChange={(e) => setSettings({ ...settings, storeAddress: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Ville
                      </label>
                      <input
                        type="text"
                        value={settings.storeCity}
                        onChange={(e) => setSettings({ ...settings, storeCity: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Quartier
                      </label>
                      <input
                        type="text"
                        value={settings.storeDistrict}
                        onChange={(e) => setSettings({ ...settings, storeDistrict: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Horaires d'ouverture
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={settings.businessHours}
                        onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Numéro d'identification fiscale
                    </label>
                    <input
                      type="text"
                      value={settings.taxId}
                      onChange={(e) => setSettings({ ...settings, taxId: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Général */}
            {activeTab === 'oldgeneral' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Informations de la boutique</h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Nom de la boutique
                    </label>
                    <input
                      type="text"
                      value={settings.storeName}
                      onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={settings.storeEmail}
                          onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Téléphone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={settings.storePhone}
                          onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Adresse
                    </label>
                    <textarea
                      value={settings.storeAddress}
                      onChange={(e) => setSettings({ ...settings, storeAddress: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Ville
                      </label>
                      <input
                        type="text"
                        value={settings.storeCity}
                        onChange={(e) => setSettings({ ...settings, storeCity: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Quartier
                      </label>
                      <input
                        type="text"
                        value={settings.storeDistrict}
                        onChange={(e) => setSettings({ ...settings, storeDistrict: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Horaires d'ouverture
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={settings.businessHours}
                        onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Numéro d'identification fiscale
                    </label>
                    <input
                      type="text"
                      value={settings.taxId}
                      onChange={(e) => setSettings({ ...settings, taxId: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Livraison */}
            {activeTab === 'delivery' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Paramètres de livraison</h2>
                
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Frais de livraison (FCFA)
                      </label>
                      <input
                        type="number"
                        value={settings.deliveryFee}
                        onChange={(e) => setSettings({ ...settings, deliveryFee: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Livraison gratuite dès (FCFA)
                      </label>
                      <input
                        type="number"
                        value={settings.freeDeliveryThreshold}
                        onChange={(e) => setSettings({ ...settings, freeDeliveryThreshold: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Rayon de livraison maximum (km)
                    </label>
                    <input
                      type="number"
                      value={settings.maxDeliveryRadius}
                      onChange={(e) => setSettings({ ...settings, maxDeliveryRadius: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Temps de livraison estimé (minutes)
                    </label>
                    <input
                      type="text"
                      value={settings.estimatedDeliveryTime}
                      onChange={(e) => setSettings({ ...settings, estimatedDeliveryTime: e.target.value })}
                      placeholder="30-45"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Paiements */}
            {activeTab === 'payments' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Méthodes de paiement</h2>
                
                <div className="space-y-4">
                  <div className="p-4 border-2 border-gray-200 rounded-xl">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                          <span className="text-2xl">💵</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Paiement à la livraison</p>
                          <p className="text-sm text-gray-500">Le client paie en espèces lors de la réception</p>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={settings.cashOnDelivery}
                          onChange={(e) => setSettings({ ...settings, cashOnDelivery: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-600"></div>
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </div>

                  <div className="p-4 border-2 border-gray-200 rounded-xl">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                          <span className="text-2xl">📱</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Mobile Money</p>
                          <p className="text-sm text-gray-500">Orange Money, MTN Money</p>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={settings.mobileMoneyEnabled}
                          onChange={(e) => setSettings({ ...settings, mobileMoneyEnabled: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-600"></div>
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </div>

                  <div className="p-4 border-2 border-gray-200 rounded-xl">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                          <span className="text-2xl">💳</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Carte bancaire</p>
                          <p className="text-sm text-gray-500">Visa, Mastercard</p>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={settings.cardPaymentEnabled}
                          onChange={(e) => setSettings({ ...settings, cardPaymentEnabled: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-600"></div>
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Préférences de notifications</h2>
                
                <div className="space-y-4">
                  {[
                    { key: 'orderNotifications', label: 'Nouvelles commandes', icon: '🛎️' },
                    { key: 'lowStockAlerts', label: 'Alertes stock faible', icon: '📦' },
                    { key: 'dailyReports', label: 'Rapports quotidiens', icon: '📊' },
                    { key: 'whatsappNotifications', label: 'Notifications WhatsApp', icon: '💬' },
                    { key: 'emailNotifications', label: 'Notifications Email', icon: '📧' },
                    { key: 'smsNotifications', label: 'Notifications SMS', icon: '📱' },
                  ].map(notif => (
                    <div key={notif.key} className="p-4 border-2 border-gray-200 rounded-xl">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{notif.icon}</span>
                          <span className="font-medium text-gray-900">{notif.label}</span>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={settings[notif.key as keyof typeof settings] as boolean}
                            onChange={(e) => setSettings({ ...settings, [notif.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600"></div>
                          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sécurité */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Sécurité</h2>
                
                <div className="space-y-5">
                  <div className="p-4 border-2 border-gray-200 rounded-xl">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <p className="font-semibold text-gray-900">Authentification à deux facteurs</p>
                        <p className="text-sm text-gray-500 mt-1">Sécurisez votre compte avec un code supplémentaire</p>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={settings.twoFactorAuth}
                          onChange={(e) => setSettings({ ...settings, twoFactorAuth: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600"></div>
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Expiration de session (minutes)
                    </label>
                    <input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}