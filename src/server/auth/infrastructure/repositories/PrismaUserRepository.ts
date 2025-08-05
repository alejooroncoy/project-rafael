import { UserRepository } from '../../domain/ports/UserRepository';
import { User } from '../../domain/entities/User';
import { prisma } from '../../../shared/infrastructure/database/prisma';
import { UserRole } from '../../domain/value-objects/UserRole';
import { UserAssembler } from '../../domain/assemblers/UserAssembler';

export class PrismaUserRepository implements UserRepository {
  async findByUid(uid: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { uid } });
    if (!user) return null;
    const domainUser = UserAssembler.fromResource(user);
    return domainUser.isActive() ? domainUser : null;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    const domainUser = UserAssembler.fromResource(user);
    return domainUser.isActive() ? domainUser : null;
  }
  async create(user: User): Promise<User> {
    const created = await prisma.user.create({
      data: {
        uid: user.uid.value,
        email: user.email,
        name: user.name,
        role: user.role?.value ?? null,
        active: user.active,
      },

    });
    return UserAssembler.fromResource(created);
  }
  async updateRole(uid: string, role: UserRole): Promise<void> {
    await prisma.user.update({ where: { uid }, data: { role: role.value } });
  }
  async findAllActive(): Promise<User[]> {
    const users = await prisma.user.findMany({ where: { active: true } });
    return users.map(u => UserAssembler.fromResource(u));
  }
  async update(uid: string, data: { name?: string; email?: string }): Promise<User> {
    const updated = await prisma.user.update({ where: { uid }, data });
    return UserAssembler.fromResource(updated);
  }
  async deactivate(uid: string): Promise<void> {
    await prisma.user.update({ where: { uid }, data: { active: false } });
  }
} 