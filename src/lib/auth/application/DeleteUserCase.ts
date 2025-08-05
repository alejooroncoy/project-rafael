import { inject } from 'inversify';
import type { HttpService } from '@/lib/shared/infrastructure/services/HttpService';
import { CLIENT_SHARED_CONTAINER_TYPES } from '@/lib/shared/infrastructure/container/types';

export class DeleteUserCase {
  constructor(@inject(CLIENT_SHARED_CONTAINER_TYPES.HttpService) private readonly httpService: HttpService) {}

  async execute(uid: string): Promise<void> {
    await this.httpService.delete(`/api/internal/users/${uid}`);
  }
} 