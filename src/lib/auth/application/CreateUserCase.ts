import { inject } from 'inversify';
import type { HttpService } from '@/lib/shared/infrastructure/services/HttpService';
import { User } from '../domain/entities/User';
import { CLIENT_SHARED_CONTAINER_TYPES } from '@/lib/shared/infrastructure/container/types';

export class CreateUserCase {
  constructor(@inject(CLIENT_SHARED_CONTAINER_TYPES.HttpService) private readonly httpService: HttpService) { }

  async execute({ email, name, role, password }: { email: string; name: string; role: string; password?: string }): Promise<{ user: User; password: string }> {
    return this.httpService.post<{ user: User; password: string }>('/api/internal/users', { email, name, role, password });
  }
} 