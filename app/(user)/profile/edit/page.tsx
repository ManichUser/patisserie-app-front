// src/app/profile/edit/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Camera } from 'lucide-react';
import { Button } from '@/components/ui/Button3';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/Avatar';

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Jenny Wilson',
    email: 'jenny.wilson@example.com',
    phone: '+237 699 999 999',
    bio: 'Passionate food lover and pastry enthusiast',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Le nom complet est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      console.log('Updated profile:', formData);
      setLoading(false);
      router.back();
    }, 1500);
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
          <h1 className="text-xl font-bold text-gray-900">Edit Profile</h1>
        </div>
      </header>

      <div className="px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar email={formData.email} name={formData.fullName} size="xl" className="ring-4 ring-gray-200" />
              <div className="absolute bottom-0 right-0 w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center shadow-lg">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-500">Avatar généré automatiquement</p>
          </div>

          <div className="space-y-4">
            <Input
              label="Nom complet"
              name="fullName"
              type="text"
              placeholder="Entrez votre nom complet"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              fullWidth
            />

            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Entrez votre email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              fullWidth
            />

            <Input
              label="Téléphone"
              name="phone"
              type="tel"
              placeholder="Entrez votre numéro"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              fullWidth
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700 ml-1">Bio</label>
              <textarea
                name="bio"
                rows={4}
                placeholder="Parlez-nous de vous..."
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all duration-200 placeholder:text-gray-400 resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" size="lg" fullWidth onClick={() => router.back()}>
              Annuler
            </Button>
            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
              <Save className="w-5 h-5" />
              Enregistrer
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}