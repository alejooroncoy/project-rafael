import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile, UserCredential, Auth } from 'firebase/auth';
import { injectable } from 'inversify';
import { FirebaseAuthConfig } from './FirebaseClientConfig';

@injectable()
export class FirebaseAuthService {
  private readonly auth: Auth;

  constructor() {
    this.auth = FirebaseAuthConfig.auth;
  }

  async signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async signUp(email: string, password: string, name: string): Promise<UserCredential> {
    const userCred = await createUserWithEmailAndPassword(this.auth, email, password);
    await updateProfile(userCred.user, { displayName: name });
    return userCred;
  }

  async sendPasswordReset(email: string): Promise<void> {
    await sendPasswordResetEmail(this.auth, email);
  }
} 