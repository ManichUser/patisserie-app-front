'use client';

import Link from 'next/link';
import { MessageSquare, Send, Calendar, Users, Image, Smartphone } from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      label: 'Envoyer un message',
      description: 'Message simple et rapide',
      icon: MessageSquare,
      href: 'admin/whatsapp/send',
      color: 'blue',
    },
    {
      label: 'Envoi groupé',
      description: 'Plusieurs destinataires',
      icon: Send,
      href: 'admin/whatsapp/bulk',
      color: 'green',
    },
    {
      label: 'Programmer',
      description: 'Message différé',
      icon: Calendar,
      href: 'admin/whatsapp/scheduler',
      color: 'orange',
    },
    {
      label: 'Publier un statut',
      description: 'Story WhatsApp',
      icon: Image,
      href: 'admin/whatsapp/media',
      color: 'purple',
    },
    {
      label: 'Groupes',
      description: 'Gérer les groupes',
      icon: Users,
      href: 'admin/whatsapp/groups',
      color: 'pink',
    },
    {
      label: 'Connexion',
      description: 'Pairing code',
      icon: Smartphone,
      href: 'admin/whatsapp/connect',
      color: 'gray',
    },
  ];

  const colorConfig: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    pink: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
    gray: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {actions.map((action) => {
        const Icon = action.icon;
        const colors = colorConfig[action.color];

        return (
          <Link
            key={action.href}
            href={action.href}
            className={`block p-4 bg-white border-2 ${colors.border} rounded-xl hover:shadow-md transition-all group`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${colors.text}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 mb-0.5">{action.label}</p>
                <p className="text-xs text-gray-600">{action.description}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}