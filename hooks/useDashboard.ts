// hooks/useDashboard.ts
import { useState, useEffect } from 'react';

interface DashboardStats {
  revenue: { current: number; previous: number; change: number };
  profit: { current: number; previous: number; change: number };
  orders: { current: number; previous: number; change: number };
  customers: { current: number; previous: number; change: number };
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  total: number;
  status: string;
  createdAt: string;
}

interface Recommendation {
  id: string;
  type: string;
  priority: string;
  title: string;
  description: string;
}

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // TODO: Remplacer par vrais appels API
      // const [statsRes, ordersRes, recsRes] = await Promise.all([
      //   fetch('/api/dashboard/stats'),
      //   fetch('/api/orders?limit=5'),
      //   fetch('/api/business-recommendations?onlyActive=true'),
      // ]);

      // Mock data
      setStats({
        revenue: { current: 850000, previous: 720000, change: 18 },
        profit: { current: 340000, previous: 280000, change: 21 },
        orders: { current: 156, previous: 142, change: 10 },
        customers: { current: 89, previous: 76, change: 17 },
      });

      setRecentOrders([
        {
          id: '1',
          orderNumber: 'CMD-001',
          customerName: 'Marie Ngono',
          total: 12500,
          status: 'PENDING',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          orderNumber: 'CMD-002',
          customerName: 'Jean Mbida',
          total: 8500,
          status: 'CONFIRMED',
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          orderNumber: 'CMD-003',
          customerName: 'Sophie Atangana',
          total: 15000,
          status: 'READY',
          createdAt: new Date().toISOString(),
        },
        {
          id: '4',
          orderNumber: 'CMD-004',
          customerName: 'Paul Essomba',
          total: 9800,
          status: 'PREPARING',
          createdAt: new Date().toISOString(),
        },
        {
          id: '5',
          orderNumber: 'CMD-005',
          customerName: 'Christine Owona',
          total: 11200,
          status: 'DELIVERED',
          createdAt: new Date().toISOString(),
        },
      ]);

      setRecommendations([
        {
          id: '1',
          type: 'INVENTORY',
          priority: 'HIGH',
          title: 'Stock critique sur 3 produits',
          description: 'Gâteau Chocolat (2), Cupcakes (3), Tarte (1)',
        },
        {
          id: '2',
          type: 'MARKETING',
          priority: 'MEDIUM',
          title: 'Produits très demandés',
          description: 'Cheesecake a 150 vues ce mois',
        },
        {
          id: '3',
          type: 'SALES',
          priority: 'LOW',
          title: 'Opportunité de vente croisée',
          description: 'Les clients qui achètent des gâteaux achètent souvent des macarons',
        },
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('fr-FR')} FCFA`;
  };

  return {
    stats,
    recentOrders,
    recommendations,
    loading,
    formatPrice,
  };
}