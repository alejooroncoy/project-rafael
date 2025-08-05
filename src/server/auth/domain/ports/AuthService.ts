import { DecodedIdToken } from "firebase-admin/auth";

export interface AuthService {
  verifyIdToken(token: string): Promise<DecodedIdToken>;
  createUser(email: string, password: string, name: string): Promise<{ uid: string }>;
  updateUser(uid: string, data: { email?: string; name?: string }): Promise<void>;
  deleteUser(uid: string): Promise<void>;
}
