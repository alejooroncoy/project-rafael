import { inject } from 'inversify';
import { AUTH_CONTAINER_TYPES } from '../infrastructure/container/types';
import type { UserRepository } from '../domain/ports/UserRepository';

export class GetUserCase {
  constructor(
    @inject(AUTH_CONTAINER_TYPES.UserRepository) private readonly userRepository: UserRepository
  ) {}

  async execute(uid: string) {
    const user = await this.userRepository.findByUid(uid);
    if (!user) throw new Error('User not found');
    return user;
  }
} 