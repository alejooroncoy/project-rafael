import { inject } from 'inversify';
import { CLIENT_SHARED_CONTAINER_TYPES } from '@/lib/shared/infrastructure/container/types';
import type { HttpService } from '@/lib/shared/infrastructure/services/HttpService';

export class UpdateUserRoleCase {
  constructor(@inject(CLIENT_SHARED_CONTAINER_TYPES.HttpService) private readonly httpService: HttpService) {}

  async execute(uid: string, role: string): Promise<void> {
    await this.httpService.patch(`/api/internal/users/${uid}/role`, { role });
  }
} 