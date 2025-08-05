import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ClientAuthContainer } from '@/lib/auth/infrastructure/container/inversify.conf';
import { CLIENT_AUTH_CONTAINER_TYPES } from '@/lib/auth/infrastructure/container/types';
import type { CreateUserCase as CreateUserCaseType } from '@/lib/auth/application/CreateUserCase';
import { User } from '@/lib/auth/domain/entities/User';

export function useCreateUser() {
  const queryClient = useQueryClient();
  const createUserCase = ClientAuthContainer.get<CreateUserCaseType>(CLIENT_AUTH_CONTAINER_TYPES.CreateUserCase);

  return useMutation<{ user: User; password: string }, Error, { email: string; name: string; role: string; password?: string }>(
    {
      mutationFn: async ({ email, name, role, password }: { email: string; name: string; role: string; password?: string }) => {
        return await createUserCase.execute({ email, name, role, password });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
    }
  );
} 