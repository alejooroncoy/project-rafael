import { inject } from 'inversify';
import { CLIENT_AUTH_CONTAINER_TYPES } from '../infrastructure/container/types';
import { FirebaseAuthService } from '../infrastructure/services/FirebaseAuthService';

export class SignInCase {
  constructor(
    @inject(CLIENT_AUTH_CONTAINER_TYPES.FirebaseAuthService) private readonly firebaseAuthService: FirebaseAuthService
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const userCred = await this.firebaseAuthService.signIn(email, password);
    return userCred.user.getIdToken();
  }
} 