import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ClientAuthContainer } from '@/lib/auth/infrastructure/container/inversify.conf';
import { CLIENT_AUTH_CONTAINER_TYPES } from '@/lib/auth/infrastructure/container/types';
import type { DeleteUserCase as DeleteUserCaseType } from '@/lib/auth/application/DeleteUserCase';

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const deleteUserCase = ClientAuthContainer.get<DeleteUserCaseType>(CLIENT_AUTH_CONTAINER_TYPES.DeleteUserCase);

  return useMutation<void, Error, { uid: string }>(
    {
      mutationFn: async ({ uid }: { uid: string }) => {
        await deleteUserCase.execute(uid);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
    }
  );
} 