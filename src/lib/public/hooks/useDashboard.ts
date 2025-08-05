import { useQuery } from '@tanstack/react-query';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/stats');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard stats');
      }
      return response.json();
    },
  });
}

export function useRecentActivity() {
  return useQuery({
    queryKey: ['recent-activity'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/activity');
      if (!response.ok) {
        throw new Error('Failed to fetch recent activity');
      }
      return response.json();
    },
  });
}

export function useGrowthMetrics() {
  return useQuery({
    queryKey: ['growth-metrics'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/growth');
      if (!response.ok) {
        throw new Error('Failed to fetch growth metrics');
      }
      return response.json();
    },
  });
}

export function useTopPerformingForms() {
  return useQuery({
    queryKey: ['top-performing-forms'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/top-forms');
      if (!response.ok) {
        throw new Error('Failed to fetch top performing forms');
      }
      return response.json();
    },
  });
} 