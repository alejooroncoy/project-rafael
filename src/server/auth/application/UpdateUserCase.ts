import { inject, injectable } from 'inversify';
import type { UserRepository } from '../domain/ports/UserRepository';
import type { AuthService } from '../domain/ports/AuthService';
import { User } from '../domain/entities/User';
import { AUTH_CONTAINER_TYPES } from '../infrastructure/container/types';

@injectable()
export class UpdateUserCase {
  constructor(
    @inject(AUTH_CONTAINER_TYPES.UserRepository) private readonly userRepository: UserRepository,
    @inject(AUTH_CONTAINER_TYPES.AuthService) private readonly authService: AuthService
  ) {}

  async execute(uid: string, data: { email?: string; name?: string }): Promise<User> {
    await this.authService.updateUser(uid, data);
    return this.userRepository.update(uid, data);
  }
} 