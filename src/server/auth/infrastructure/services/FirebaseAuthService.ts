import { getAuth, DecodedIdToken, Auth } from 'firebase-admin/auth';
import { getApps, initializeApp } from 'firebase-admin/app';
import { FirebaseAuthConfig } from './FirebaseAuthConfig';
import { AuthService } from '../../domain/ports/AuthService';

export class FirebaseAuthService implements AuthService {
  private readonly auth: Auth;
  private static DEFAULT_APP_NAME = "firebase-happyme-app";

  constructor() {
    const app = getApps().find(
      (app) => app.name === FirebaseAuthService.DEFAULT_APP_NAME
    ) || initializeApp(FirebaseAuthConfig(), FirebaseAuthService.DEFAULT_APP_NAME);
    this.auth = getAuth(app);
  }
  async verifyIdToken(token: string): Promise<DecodedIdToken> {
    return this.auth.verifyIdToken(token);
  }
  async createUser(email: string, password: string, name: string): Promise<{ uid: string }> {
    const userRecord = await this.auth.createUser({ email, password, displayName: name });
    return { uid: userRecord.uid };
  }
  async updateUser(uid: string, data: { email?: string; name?: string }): Promise<void> {
    await this.auth.updateUser(uid, {
      ...(data.email ? { email: data.email } : {}),
      ...(data.name ? { displayName: data.name } : {}),
    });
  }
  async deleteUser(uid: string): Promise<void> {
    await this.auth.deleteUser(uid);
  }
} 