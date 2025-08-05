import { inject, injectable } from 'inversify';
import type { UserRepository } from '../domain/ports/UserRepository';
import { UserRole } from '../domain/value-objects/UserRole';
import { UserRole as PrismaUserRole } from '@/lib/generated/prisma';
import { AUTH_CONTAINER_TYPES } from '../infrastructure/container/types';

@injectable()
export class UpdateUserRoleCase {
  constructor(@inject(AUTH_CONTAINER_TYPES.UserRepository) private readonly userRepository: UserRepository) {}

  async execute(uid: string, role: string): Promise<void> {
    await this.userRepository.updateRole(uid, new UserRole(role as PrismaUserRole));
  }
} 