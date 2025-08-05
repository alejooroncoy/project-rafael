import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { ClientAuthContainer } from '@/lib/auth/infrastructure/container/inversify.conf';
import { CLIENT_AUTH_CONTAINER_TYPES } from '@/lib/auth/infrastructure/container/types';
import { User } from '@/lib/auth/domain/entities/User';
import type { GetAllUsersCase as GetAllUsersCaseType } from '@/lib/auth/application/GetAllUsersCase';

export function useUsers() {
  const getAllUsersCase = useMemo<GetAllUsersCaseType>(
    () => ClientAuthContainer.get<GetAllUsersCaseType>(CLIENT_AUTH_CONTAINER_TYPES.GetAllUsersCase),
    []
  );
  const query = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: () => getAllUsersCase.execute(),
  });
  return {
    users: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
} 