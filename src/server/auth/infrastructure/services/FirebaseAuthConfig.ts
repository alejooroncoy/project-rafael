import { cert, ServiceAccount } from "firebase-admin/app";

export function FirebaseAuthConfig() {
	if (process.env.NEXT_PUBLIC_ENVIRONMENT === "local") {
		return {
			project_id: process.env.GCLOUD_PROJECT
		}
	}
	return {
		credential: cert({
			project_id: process.env.FIREBASE_PROJECT_ID,
			private_key: process.env.FIREBASE_PRIVATE_KEY,
			client_email: process.env.FIREBASE_CLIENT_EMAIL,
		} as ServiceAccount)
	}
}
