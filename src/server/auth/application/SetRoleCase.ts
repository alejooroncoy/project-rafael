import { inject } from 'inversify';
import { AUTH_CONTAINER_TYPES } from '../infrastructure/container/types';
import type { UserRepository } from '../domain/ports/UserRepository';
import { UserRole } from '../domain/value-objects/UserRole';
import { UserRole as PrismaUserRole } from '@/lib/generated/prisma';

export class SetRoleCase {
  constructor(
    @inject(AUTH_CONTAINER_TYPES.UserRepository) private readonly userRepository: UserRepository
  ) { }

  async execute(uid: string, role: PrismaUserRole) {
    await this.userRepository.updateRole(uid, new UserRole(role));
  }
} 