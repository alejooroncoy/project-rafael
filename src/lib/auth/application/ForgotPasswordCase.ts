import { inject } from 'inversify';
import { CLIENT_AUTH_CONTAINER_TYPES } from '../infrastructure/container/types';
import { FirebaseAuthService } from '../infrastructure/services/FirebaseAuthService';

export class ForgotPasswordCase {
  constructor(
    @inject(CLIENT_AUTH_CONTAINER_TYPES.FirebaseAuthService) private readonly firebaseAuthService: FirebaseAuthService
  ) {}

  async execute(email: string): Promise<void> {
    await this.firebaseAuthService.sendPasswordReset(email);
  }
} 