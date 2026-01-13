'use client';

import { useState, useEffect } from 'react';
import { ActivityFeed } from '@/components/whatsapp/ActivityFeed';
import { RefreshCw, Download, Filter } from 'lucide-react';

export default function LogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'success' | 'pending' | 'failed'>('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/whatsapp/scheduler');
      const data = await res.json();
      
      const mapped = (data.data || []).map((schedule: any) => ({
        id: schedule.id,
        type: 'message',
        message: `${schedule.message} → ${schedule.recipients?.length || 0} destinataire(s)`,
        timestamp: schedule.scheduledAt,
        status: schedule.status === 'SENT' ? 'success' : schedule.status === 'PENDING' ? 'pending' : 'failed',
      }));

      setLogs(mapped);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    // Auto-refresh every 30s
    const interval = setInterval(fetchLogs, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchLogs();
  };

  const handleExport = () => {
    const csv = logs.map(log => 
      `"${log.timestamp}","${log.status}","${log.message.replace(/"/g, '""')}"`
    ).join('\n');
    
    const blob = new Blob([`"Date","Status","Message"\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `whatsapp-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filtered = filter === 'all' 
    ? logs 
    : logs.filter(log => log.status === filter);

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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Logs & Monitoring</h1>
          <p className="text-sm text-gray-600 mt-1">
            {logs.length} activité(s) enregistrée(s)
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exporter</span>
          </button>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: logs.length, color: 'blue' },
          { label: 'Succès', value: logs.filter(l => l.status === 'success').length, color: 'green' },
          { label: 'En attente', value: logs.filter(l => l.status === 'pending').length, color: 'orange' },
          { label: 'Échecs', value: logs.filter(l => l.status === 'failed').length, color: 'red' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-semibold text-gray-900">Filtrer par statut</span>
        </div>
        <div className="flex gap-2">
          {[
            { value: 'all', label: 'Tous' },
            { value: 'success', label: 'Succès' },
            { value: 'pending', label: 'En attente' },
            { value: 'failed', label: 'Échecs' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value as any)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filter === f.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="font-semibold text-gray-900 mb-4">
          Activités {filter !== 'all' && `(${filter})`}
        </h2>
        <ActivityFeed activities={filtered} />
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-semibold text-blue-900 mb-2">
          ℹ️ À propos
        </p>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Les logs sont automatiquement rafraîchis toutes les 30 secondes</li>
          <li>• Vous pouvez exporter les logs en CSV</li>
          <li>• Les filtres permettent de voir les activités par statut</li>
          <li>• L'historique complet est disponible via l'API</li>
        </ul>
      </div>
    </div>
  );
}