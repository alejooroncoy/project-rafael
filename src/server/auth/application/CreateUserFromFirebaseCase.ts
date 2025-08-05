import { inject } from 'inversify';
import { AUTH_CONTAINER_TYPES } from '../infrastructure/container/types';
import type { UserRepository } from '../domain/ports/UserRepository';
import { User } from '../domain/entities/User';
import { UserID } from '../domain/value-objects/UserID';

export class CreateUserFromFirebaseCase {
  constructor(
    @inject(AUTH_CONTAINER_TYPES.UserRepository) private readonly userRepository: UserRepository
  ) {}

  async execute(uid: string, email: string, name: string) {
    const user = new User(
      new UserID(uid),
      email,
      name,
      undefined,
      new Date(),
      new Date()
    );
    return await this.userRepository.create(user);
  }
} 