import { User } from '../entities/User';
import { UserRole } from '../value-objects/UserRole';

export interface UserRepository {
  findByUid(uid: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
  updateRole(uid: string, role: UserRole): Promise<void>;
  findAllActive(): Promise<User[]>;
  update(uid: string, data: { name?: string; email?: string }): Promise<User>;
  deactivate(uid: string): Promise<void>;
} 