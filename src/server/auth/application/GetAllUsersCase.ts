import { inject, injectable } from 'inversify';
import type { UserRepository } from '../domain/ports/UserRepository';
import { User } from '../domain/entities/User';
import { AUTH_CONTAINER_TYPES } from '../infrastructure/container/types';

@injectable()
export class GetAllUsersCase {
  constructor(@inject(AUTH_CONTAINER_TYPES.UserRepository) private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAllActive();
  }
} 