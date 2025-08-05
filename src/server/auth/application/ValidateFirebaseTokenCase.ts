import { inject } from 'inversify';
import { AUTH_CONTAINER_TYPES } from '../infrastructure/container/types';
import type { AuthService } from '../domain/ports/AuthService';

export class ValidateFirebaseTokenCase {
  constructor(
    @inject(AUTH_CONTAINER_TYPES.AuthService)
    private readonly authService: AuthService) { }

  async execute(token: string): Promise<{ uid: string; email?: string }> {
    try {
      const decoded = await this.authService.verifyIdToken(token);
      return { uid: decoded.uid, email: decoded.email };
    } catch (error) {
      console.error(error);
      throw new Error('Invalid Firebase token');
    }
  }
} 