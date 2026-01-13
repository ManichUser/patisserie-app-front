'use client';

import { useState, useEffect } from 'react';
import { ScheduleForm } from '@/components/whatsapp/ScheduleForm';
import { SchedulesList } from '@/components/whatsapp/SchedulesList';
import { SchedulerStats } from '@/components/whatsapp/SchedulerStats';
import { RefreshCw } from 'lucide-react';

export default function SchedulerPage() {
  const [schedules, setSchedules] = useState([]);
  const [stats, setStats] = useState({ pending: 0, sent: 0, failed: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const [schedulesRes, statsRes] = await Promise.all([
        fetch('/api/whatsapp/scheduler'),
        fetch('/api/whatsapp/scheduler/stats'),
      ]);

      const schedulesData = await schedulesRes.json();
      const statsData = await statsRes.json();

      setSchedules(schedulesData.data || []);
      setStats(statsData.data || { pending: 0, sent: 0, failed: 0, total: 0 });
    } catch (error) {
      console.error('Error fetching scheduler data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Auto-refresh every 10s
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
          <p className="text-sm text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages Programmés</h1>
          <p className="text-sm text-gray-600 mt-1">
            Planifiez vos envois à l'avance
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Stats */}
      <SchedulerStats stats={stats} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
            <h2 className="font-semibold text-gray-900 mb-4">Nouveau message</h2>
            <ScheduleForm onSuccess={fetchData} />
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Historique</h2>
            <SchedulesList schedules={schedules} onScheduleDeleted={fetchData} />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-semibold text-blue-900 mb-2">
          ⏰ Comment ça marche ?
        </p>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Les messages sont vérifiés et envoyés automatiquement chaque minute</li>
          <li>• Vous pouvez annuler un message tant qu'il est en attente</li>
          <li>• Un compte à rebours s'affiche pour les messages programmés</li>
          <li>• Les statistiques se mettent à jour automatiquement</li>
        </ul>
      </div>
    </div>
  );
}