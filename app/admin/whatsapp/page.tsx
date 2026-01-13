'use client';

import { useEffect, useState } from 'react';
import { StatsCards } from '@/components/whatsapp/StatsCards';
import { QuickActions } from '@/components/whatsapp/QuickActions';
import { ActivityFeed } from '@/components/whatsapp/ActivityFeed';

export default function WhatsAppDashboard() {
  const [stats, setStats] = useState({
    totalMessages: 0,
    scheduledMessages: 0,
    groupsCount: 0,
    statusCount: 0,
  });

  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    // Fetch stats
    const fetchStats = async () => {
      try {
        const [schedulerRes, groupsRes] = await Promise.all([
          fetch('/api/whatsapp/scheduler/stats'),
          fetch('/api/whatsapp/groups'),
        ]);

        const schedulerData = await schedulerRes.json();
        const groupsData = await groupsRes.json();

        setStats({
          totalMessages: schedulerData.data?.sent || 0,
          scheduledMessages: schedulerData.data?.pending || 0,
          groupsCount: groupsData.data?.length || 0,
          statusCount: 0, // TODO: Add status count if needed
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    // Fetch recent activities
    const fetchActivities = async () => {
      try {
        const res = await fetch('/api/whatsapp/scheduler?limit=10');
        const data = await res.json();
        
        const mapped = (data.data || []).slice(0, 5).map((schedule: any) => ({
          id: schedule.id,
          type: 'scheduled',
          message: schedule.message,
          timestamp: schedule.scheduledAt,
          status: schedule.status === 'SENT' ? 'success' : schedule.status === 'PENDING' ? 'pending' : 'failed',
        }));

        setActivities(mapped);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchStats();
    fetchActivities();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">
          Vue d'ensemble de votre bot WhatsApp
        </p>
      </div>

      {/* Stats */}
      <StatsCards stats={stats} />

      {/* Quick Actions */}
      <div>
        <h2 className="font-semibold text-gray-900 mb-4">⚡ Actions rapides</h2>
        <QuickActions />
      </div>

      {/* Activity Feed */}
      <div>
        <h2 className="font-semibold text-gray-900 mb-4">📊 Activité récente</h2>
        <ActivityFeed activities={activities} />
      </div>
    </div>
  );
}