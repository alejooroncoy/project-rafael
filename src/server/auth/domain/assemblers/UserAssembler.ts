import { User } from '../entities/User';
import { UserResource } from '../entities/User';
import { UserID } from '../value-objects/UserID';
import { UserRole } from '../value-objects/UserRole';

export class UserAssembler {
  static toResource(user: User): UserResource {
    return {
      uid: user.uid.value,
      email: user.email,
      name: user.name,
      role: user.role?.value,
      active: user.active,
      createdAt: user.createdAt ?? undefined,
      updatedAt: user.updatedAt ?? undefined,
    };
  }

  static fromResource(resource: UserResource): User {
    return new User(
      new UserID(resource.uid),
      resource.email,
      resource.name,
      resource.role ? new UserRole(resource.role) : undefined,
      resource.createdAt ? new Date(resource.createdAt) : undefined,
      resource.updatedAt ? new Date(resource.updatedAt) : undefined,
      resource.active ?? true
    );
  }
} 