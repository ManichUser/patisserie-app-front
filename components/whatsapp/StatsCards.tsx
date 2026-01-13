'use client';

import { MessageSquare, Send, Calendar, Radio, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    totalMessages: number;
    scheduledMessages: number;
    groupsCount: number;
    statusCount: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: 'Messages envoyés',
      value: stats.totalMessages,
      icon: MessageSquare,
      color: 'blue',
      trend: '+12%',
    },
    {
      label: 'Messages programmés',
      value: stats.scheduledMessages,
      icon: Calendar,
      color: 'orange',
      trend: `${stats.scheduledMessages} actifs`,
    },
    {
      label: 'Groupes actifs',
      value: stats.groupsCount,
      icon: Send,
      color: 'green',
      trend: 'Synchronisés',
    },
    {
      label: 'Statuts publiés',
      value: stats.statusCount,
      icon: Radio,
      color: 'purple',
      trend: 'Cette semaine',
    },
  ];

  const colorConfig: Record<string, { bg: string; text: string; icon: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', icon: 'text-blue-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', icon: 'text-orange-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600', icon: 'text-green-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', icon: 'text-purple-600' },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const colors = colorConfig[card.color];

        return (
          <div
            key={card.label}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${colors.icon}`} />
              </div>
              {card.trend && (
                <span className="text-xs text-gray-600 flex items-center gap-1">
                  {card.trend.startsWith('+') && <TrendingUp className="w-3 h-3" />}
                  {card.trend}
                </span>
              )}
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{card.value}</p>
            <p className="text-sm text-gray-600">{card.label}</p>
          </div>
        );
      })}
    </div>
  );
}