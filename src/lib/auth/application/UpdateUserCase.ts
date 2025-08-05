import { inject } from 'inversify';
import { CLIENT_SHARED_CONTAINER_TYPES } from '@/lib/shared/infrastructure/container/types';
import type { HttpService } from '@/lib/shared/infrastructure/services/HttpService';
import { User } from '../domain/entities/User';

export class UpdateUserCase {
  constructor(@inject(CLIENT_SHARED_CONTAINER_TYPES.HttpService) private readonly httpService: HttpService) {}

  async execute(uid: string, data: { email?: string; name?: string; password?: string }): Promise<User> {
    return this.httpService.patch<User>(`/api/internal/users/${uid}`, data);
  }
} 