import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ClientAuthContainer } from '@/lib/auth/infrastructure/container/inversify.conf';
import { CLIENT_AUTH_CONTAINER_TYPES } from '@/lib/auth/infrastructure/container/types';
import type { UpdateUserRoleCase as UpdateUserRoleCaseType } from '@/lib/auth/application/UpdateUserRoleCase';

export function useUpdateUserRole() {
  const queryClient = useQueryClient();
  const updateUserRoleCase = ClientAuthContainer.get<UpdateUserRoleCaseType>(CLIENT_AUTH_CONTAINER_TYPES.UpdateUserRoleCase);

  return useMutation<void, Error, { uid: string; role: string }>(
    {
      mutationFn: async ({ uid, role }: { uid: string; role: string }) => {
        await updateUserRoleCase.execute(uid, role);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
    }
  );
} 