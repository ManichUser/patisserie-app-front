'use client';

type Status = 'connected' | 'connecting' | 'disconnected';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig = {
  connected: {
    label: 'Connecté',
    color: 'bg-green-100 text-green-700 border-green-200',
    dot: 'bg-green-500',
  },
  connecting: {
    label: 'Connexion...',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    dot: 'bg-orange-500 animate-pulse',
  },
  disconnected: {
    label: 'Déconnecté',
    color: 'bg-gray-100 text-gray-700 border-gray-200',
    dot: 'bg-gray-400',
  },
};

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${config.color} ${className}`}>
      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
      <span className="text-sm font-medium">{config.label}</span>
    </div>
  );
}