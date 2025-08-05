import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ClientAuthContainer } from '@/lib/auth/infrastructure/container/inversify.conf';
import { CLIENT_AUTH_CONTAINER_TYPES } from '@/lib/auth/infrastructure/container/types';
import type { UpdateUserCase as UpdateUserCaseType } from '@/lib/auth/application/UpdateUserCase';
import { User } from '@/lib/auth/domain/entities/User';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const updateUserCase = ClientAuthContainer.get<UpdateUserCaseType>(CLIENT_AUTH_CONTAINER_TYPES.UpdateUserCase);

  return useMutation<User, Error, { uid: string; data: { email?: string; name?: string; password?: string } }>(
    {
      mutationFn: async ({ uid, data }: { uid: string; data: { email?: string; name?: string; password?: string } }) => {
        return await updateUserCase.execute(uid, data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
    }
  );
} 