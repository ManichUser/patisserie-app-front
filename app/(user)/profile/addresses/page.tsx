// src/app/profile/addresses/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, MapPin, Home, Briefcase, Edit, Trash2, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button3';

interface Address {
  id: string;
  label: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Maison',
      type: 'home',
      street: '123 Rue de la Paix',
      city: 'Yaoundé',
      postalCode: '00237',
      country: 'Cameroun',
      isDefault: true,
    },
    {
      id: '2',
      label: 'Bureau',
      type: 'work',
      street: '456 Avenue du Commerce',
      city: 'Douala',
      postalCode: '00237',
      country: 'Cameroun',
      isDefault: false,
    },
  ]);

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleDelete = (id: string) => {
    if (confirm('Voulez-vous supprimer cette adresse ?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'home': return <Home className="w-5 h-5" />;
      case 'work': return <Briefcase className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-900" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">My Addresses</h1>
          </div>
          <button
            onClick={() => router.push('/profile/addresses/add')}
            className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center text-white hover:bg-amber-800 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="px-6 py-6">
        {addresses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <MapPin className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Addresses Yet</h2>
            <p className="text-gray-500 mb-8">Add an address to get started</p>
            <Button variant="primary" size="lg" onClick={() => router.push('/profile/addresses/add')}>
              <Plus className="w-5 h-5" />
              Add Address
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all relative"
              >
                {address.isDefault && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Default
                    </span>
                  </div>
                )}

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center shrink-0 text-amber-700">
                    {getIcon(address.type)}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{address.label}</h3>
                    <p className="text-sm text-gray-600 mb-2">{address.street}</p>
                    <p className="text-sm text-gray-500">
                      {address.city}, {address.postalCode}
                    </p>
                    <p className="text-sm text-gray-500">{address.country}</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="flex-1 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => router.push(`/profile/addresses/edit/${address.id}`)}
                    className="flex-1 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="flex-1 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}