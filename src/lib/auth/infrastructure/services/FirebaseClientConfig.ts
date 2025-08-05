import { getApps, initializeApp } from "firebase/app";
import { Auth, connectAuthEmulator, getAuth } from "firebase/auth";

export class FirebaseAuthConfig {
  private static _auth: Auth;
  private static config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };


  private static create() {    
    const app = getApps().length
      ? getApps()[0]
      : initializeApp(FirebaseAuthConfig.config);
    FirebaseAuthConfig._auth = getAuth(app);

    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "local") {
      connectAuthEmulator(FirebaseAuthConfig._auth, "http://127.0.0.1:9099");
    }
  }

  static get auth() {
    if (!FirebaseAuthConfig._auth) {
      FirebaseAuthConfig.create();
    }
    return FirebaseAuthConfig._auth;
  }
}
