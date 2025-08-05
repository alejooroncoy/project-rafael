import { inject } from 'inversify';
import { CLIENT_SHARED_CONTAINER_TYPES } from '@/lib/shared/infrastructure/container/types';
import type { HttpService } from '@/lib/shared/infrastructure/services/HttpService';
import { User } from '../domain/entities/User';

export class GetAllUsersCase {
  constructor(@inject(CLIENT_SHARED_CONTAINER_TYPES.HttpService) private readonly httpService: HttpService) {}

  async execute(): Promise<User[]> {
    return this.httpService.get<User[]>('/api/internal/users');
  }
} 