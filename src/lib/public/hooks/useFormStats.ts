import { useQuery } from '@tanstack/react-query';

export function useFormStats(formId: string) {
  return useQuery({
    queryKey: ['form-stats', formId],
    queryFn: async () => {
      const response = await fetch(`/api/forms/${formId}/stats`);
      if (!response.ok) {
        throw new Error('Failed to fetch form stats');
      }
      return response.json();
    },
    enabled: !!formId,
  });
}

export function useResponseTrends(formId: string) {
  return useQuery({
    queryKey: ['response-trends', formId],
    queryFn: async () => {
      const response = await fetch(`/api/forms/${formId}/trends`);
      if (!response.ok) {
        throw new Error('Failed to fetch response trends');
      }
      return response.json();
    },
    enabled: !!formId,
  });
}

export function useTopFields(formId: string) {
  return useQuery({
    queryKey: ['top-fields', formId],
    queryFn: async () => {
      const response = await fetch(`/api/forms/${formId}/top-fields`);
      if (!response.ok) {
        throw new Error('Failed to fetch top fields');
      }
      return response.json();
    },
    enabled: !!formId,
  });
}

export function useResponseStats(formId: string) {
  return useQuery({
    queryKey: ['response-stats', formId],
    queryFn: async () => {
      const response = await fetch(`/api/forms/${formId}/response-stats`);
      if (!response.ok) {
        throw new Error('Failed to fetch response stats');
      }
      return response.json();
    },
    enabled: !!formId,
  });
}

export function useRecentActivity(formId: string, limit: number = 5) {
  return useQuery({
    queryKey: ['recent-activity', formId, limit],
    queryFn: async () => {
      const response = await fetch(`/api/forms/${formId}/recent-activity?limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recent activity');
      }
      return response.json();
    },
    enabled: !!formId,
  });
} 