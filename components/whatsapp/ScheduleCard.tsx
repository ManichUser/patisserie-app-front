'use client';

import { Calendar, Clock, Users, Trash2, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ScheduleCardProps {
  schedule: {
    id: string;
    message: string;
    type: string;
    scheduledAt: string;
    status: 'PENDING' | 'SENT' | 'FAILED';
    recipients: Array<{ recipient: string; status: string }>;
  };
  onDelete?: (id: string) => void;
}

export function ScheduleCard({ schedule, onDelete }: ScheduleCardProps) {
  const [timeLeft, setTimeLeft] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (schedule.status !== 'PENDING') return;

    const updateTimeLeft = () => {
      const now = Date.now();
      const target = new Date(schedule.scheduledAt).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft('En cours...');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (hours > 0) {
        setTimeLeft(`Dans ${hours}h ${minutes}m`);
      } else if (minutes > 0) {
        setTimeLeft(`Dans ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`Dans ${seconds}s`);
      }
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [schedule.scheduledAt, schedule.status]);

  const handleDelete = async () => {
    if (!confirm('Annuler ce message programmé ?')) return;
    
    setDeleting(true);
    try {
      await fetch(`/api/whatsapp/scheduler/${schedule.id}`, {
        method: 'DELETE',
      });
      onDelete?.(schedule.id);
    } catch (error) {
      alert('Erreur lors de l\'annulation');
    } finally {
      setDeleting(false);
    }
  };

  const statusConfig = {
    PENDING: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', icon: Clock },
    SENT: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', icon: CheckCircle },
    FAILED: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: XCircle },
  };

  const config = statusConfig[schedule.status];
  const StatusIcon = config.icon;

  const pendingCount = schedule.recipients.filter(r => r.status === 'PENDING').length;
  const sentCount = schedule.recipients.filter(r => r.status === 'SENT').length;
  const failedCount = schedule.recipients.filter(r => r.status === 'FAILED').length;

  return (
    <div className={`rounded-lg border-2 ${config.border} ${config.bg} p-4 hover:shadow-md transition-shadow`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <StatusIcon className={`w-4 h-4 flex-shrink-0 ${config.text}`} />
            <span className={`text-xs font-semibold uppercase ${config.text}`}>
              {schedule.status}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-900 line-clamp-2">
            {schedule.message}
          </p>
        </div>

        {schedule.status === 'PENDING' && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors disabled:opacity-50"
          >
            {deleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Metadata */}
      <div className="space-y-2 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>
            {new Date(schedule.scheduledAt).toLocaleString('fr-FR', {
              dateStyle: 'short',
              timeStyle: 'short',
            })}
          </span>
          {schedule.status === 'PENDING' && timeLeft && (
            <span className="font-semibold text-orange-700">• {timeLeft}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5" />
          <span>
            {schedule.recipients.length} destinataire(s)
            {sentCount > 0 && <span className="text-green-700"> • {sentCount} envoyé(s)</span>}
            {failedCount > 0 && <span className="text-red-700"> • {failedCount} échoué(s)</span>}
          </span>
        </div>
      </div>
    </div>
  );
}