'use client';

import { useState } from 'react';
import { ScheduleCard } from './ScheduleCard';
import { Clock } from 'lucide-react';

interface SchedulesListProps {
  schedules: any[];
  onScheduleDeleted: () => void;
}

export function SchedulesList({ schedules, onScheduleDeleted }: SchedulesListProps) {
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'SENT' | 'FAILED'>('ALL');

  const filtered = filter === 'ALL' 
    ? schedules 
    : schedules.filter(s => s.status === filter);

  const counts = {
    ALL: schedules.length,
    PENDING: schedules.filter(s => s.status === 'PENDING').length,
    SENT: schedules.filter(s => s.status === 'SENT').length,
    FAILED: schedules.filter(s => s.status === 'FAILED').length,
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {(['ALL', 'PENDING', 'SENT', 'FAILED'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status === 'ALL' ? 'Tous' : status === 'PENDING' ? 'En attente' : status === 'SENT' ? 'Envoyés' : 'Échecs'}
            <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
              {counts[status]}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-900">Aucun message programmé</p>
          <p className="text-xs text-gray-600 mt-1">
            {filter === 'ALL' 
              ? 'Créez votre premier message programmé'
              : `Aucun message avec le statut "${filter}"`
            }
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((schedule) => (
            <ScheduleCard
              key={schedule.id}
              schedule={schedule}
              onDelete={onScheduleDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
}