import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateFormData {
  id: string;
  title?: string;
  description?: string;
  slug?: string;
  isActive?: boolean;
  updatedBy?: string;
}

export function useUpdateForm() {
  const queryClient = useQueryClient();

  return useMutation<any, Error, UpdateFormData>({
    mutationFn: async (data: UpdateFormData) => {
      const response = await fetch('/api/forms', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error al actualizar formulario');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
    },
  });
} 