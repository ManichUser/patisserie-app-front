'use client';

import { CheckCircle, Clock, XCircle, Calendar } from 'lucide-react';

interface Activity {
  id: string;
  type: 'message' | 'scheduled' | 'status' | 'group';
  message: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
}

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'scheduled':
        return Calendar;
      default:
        return CheckCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'pending':
        return 'text-orange-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return CheckCircle;
      case 'pending':
        return Clock;
      case 'failed':
        return XCircle;
      default:
        return Clock;
    }
  };

  if (activities.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-sm font-medium text-gray-900">Aucune activité récente</p>
        <p className="text-xs text-gray-600 mt-1">Les actions apparaîtront ici</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => {
        const StatusIcon = getStatusIcon(activity.status);
        const statusColor = getStatusColor(activity.status);

        return (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
          >
            <StatusIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${statusColor}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 line-clamp-2">{activity.message}</p>
              <p className="text-xs text-gray-600 mt-1">
                {new Date(activity.timestamp).toLocaleString('fr-FR', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}