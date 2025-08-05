import { inject } from 'inversify';
import { CLIENT_AUTH_CONTAINER_TYPES } from '../infrastructure/container/types';
import { FirebaseAuthService } from '../infrastructure/services/FirebaseAuthService';
import { CLIENT_SHARED_CONTAINER_TYPES } from '@/lib/shared/infrastructure/container/types';
import { HttpService } from '@/lib/shared/infrastructure/services/HttpService';

interface ValidationResponse {
  valid: boolean;
  message?: string;
}

export class SignUpCase {
  private readonly VALIDATE_SECRET_PATH = "/api/auth/validate-signup-secret";
  private readonly CREATE_ACCOUNT_PATH = "/api/auth/create-account";

  constructor(
    @inject(CLIENT_SHARED_CONTAINER_TYPES.HttpService) private readonly httpService: HttpService,
    @inject(CLIENT_AUTH_CONTAINER_TYPES.FirebaseAuthService) private readonly firebaseAuthService: FirebaseAuthService
  ) { }

  async execute(email: string, password: string, name: string, secretSignup: string): Promise<string> {
    // First, validate the secret before creating Firebase user
    const validationResponse = await this.httpService.post<ValidationResponse>(this.VALIDATE_SECRET_PATH, { secretSignup });
    
    if (!validationResponse.valid) {
      throw new Error(validationResponse.message || "Invalid signup secret");
    }

    // If secret is valid, proceed with Firebase signup
    const userCred = await this.firebaseAuthService.signUp(email, password, name);
    
    // Create account in our database
    await this.httpService.post(this.CREATE_ACCOUNT_PATH, { 
      token: await userCred.user.getIdToken(), 
      name,
      secretSignup 
    });
    
    return userCred.user.getIdToken();
  }
} 