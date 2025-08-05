import { inject, injectable } from 'inversify';
import type { UserRepository } from '../domain/ports/UserRepository';
import type { AuthService } from '../domain/ports/AuthService';
import { AUTH_CONTAINER_TYPES } from '../infrastructure/container/types';

@injectable()
export class DeleteUserCase {
  constructor(
    @inject(AUTH_CONTAINER_TYPES.UserRepository) private readonly userRepository: UserRepository,
    @inject(AUTH_CONTAINER_TYPES.AuthService) private readonly authService: AuthService
  ) {}

  async execute(uid: string): Promise<void> {
    await this.userRepository.deactivate(uid);
    await this.authService.deleteUser(uid);
  }
} 