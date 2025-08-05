import { UserRole as PrismaUserRole } from '@/lib/generated/prisma';


export class UserRole {
  constructor(public readonly value: PrismaUserRole) {
    if (!Object.values(PrismaUserRole).includes(value)) {
      throw new Error(`Invalid user role: ${value}`);
    }
  }
} 