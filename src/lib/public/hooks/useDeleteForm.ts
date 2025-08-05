import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteForm() {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { id: string }>({
    mutationFn: async ({ id }: { id: string }) => {
      const response = await fetch(`/api/forms/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error al eliminar formulario');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
    },
  });
} 