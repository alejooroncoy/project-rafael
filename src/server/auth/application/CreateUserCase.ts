import { inject, injectable } from 'inversify';
import type { UserRepository } from '../domain/ports/UserRepository';
import type { AuthService } from '../domain/ports/AuthService';
import { User } from '../domain/entities/User';
import { UserID } from '../domain/value-objects/UserID';
import { UserRole } from '../domain/value-objects/UserRole';
import { UserRole as PrismaUserRole } from '@/lib/generated/prisma';
import { AUTH_CONTAINER_TYPES } from '../infrastructure/container/types';

@injectable()
export class CreateUserCase {
  constructor(
    @inject(AUTH_CONTAINER_TYPES.UserRepository) private readonly userRepository: UserRepository,
    @inject(AUTH_CONTAINER_TYPES.AuthService) private readonly authService: AuthService,
  ) { }

  async execute({ email, name, role, password }: { email: string; name: string; role: string; password: string }): Promise<{ user: User; password: string }> {
    // Crear usuario en Firebase
    const { uid } = await this.authService.createUser(email, password, name);
    // Crear usuario en la base de datos
    const user = await this.userRepository.create(
      new User(
        new UserID(uid),
        email,
        name,
        new UserRole(role as PrismaUserRole),
        new Date(),
        new Date(),
        true
      )
    );
    return { user, password };
  }
} 