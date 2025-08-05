import { UserID } from '../value-objects/UserID';
import { UserRole } from '../value-objects/UserRole';
import { UserRole as PrismaUserRole } from '@/lib/generated/prisma';

export interface UserResource {
  uid: string;
  email: string;
  name: string;
  role?: PrismaUserRole | null;
  active: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export class User {
  constructor(
    public readonly uid: UserID,
    public email: string,
    public name: string,
    public role?: UserRole | null,
    public createdAt?: Date | null,
    public updatedAt?: Date | null,
    public active: boolean = true
  ) { }

  isActive(): boolean {
    return this.active;
  }
} 