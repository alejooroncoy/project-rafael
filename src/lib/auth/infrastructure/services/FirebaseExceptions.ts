
export type FirebaseAuthException = {
	code: string;
	message: string;
	name: string;
};

export class FirebaseAuthError {
	/**
	 * Handle Firebase Authentication errors and throw a new error with a user-friendly message.
	 * @param error - The FirebaseAuthException object containing error details.
	 * @throws {Error} - Throws a new error with a user-friendly message based on the error code.
	 */
	public static handleError(error: FirebaseAuthException): never {
		if (!error || !error.code) {
			throw new Error("Ocurrió un error desconocido.");
		}

		switch (error.code) {

			case "auth/invalid-email-domain":
				throw new Error(
					"El dominio del correo electrónico no es válido.",
				);
				
			case "auth/email-already-exists":
				throw new Error(
					"El correo electrónico ya está en uso.",
				);

			case "auth/email-already-in-use":
				throw new Error(
					"El correo electrónico ya está en uso.",
				);

			case "auth/internal-error":
				throw new Error(
					"Error interno. Por favor, intenta más tarde.",
				);

			case "auth/invalid-continue-uri":
				throw new Error("URL de continuación no válida.");

			case "auth/invalid-credential":
				throw new Error(
					"Credencial inválida para ingresar.",
				);

			case "auth/invalid-display-name":
				throw new Error("Nombre de usuario no válido.");

			case "auth/invalid-dynamic-link-domain":
				throw new Error(
					"Dominio de enlace dinámico no autorizado.",
				);

			case "auth/invalid-email":
				throw new Error("Correo electrónico no válido.");

			case "auth/invalid-password":
				throw new Error(
					"Contraseña inválida. Mínimo 6 caracteres.",
				);

			case "auth/operation-not-allowed":
				throw new Error(
					"Método de inicio de sesión deshabilitado.",
				);

			case "auth/project-not-found":
				throw new Error("Proyecto de Firebase no encontrado.");

			case "auth/maximum-user-count-exceeded":
				throw new Error("Máximo de usuarios importados excedido.");

			case "auth/missing-continue-uri":
				throw new Error("Falta URL de continuación.");

			case "auth/too-many-requests":
				throw new Error(
					"Demasiadas solicitudes. Intenta más tarde.",
				);

			case "auth/uid-already-exists":
				throw new Error("UID ya está en uso.");

			case "auth/unauthorized-continue-uri":
				throw new Error("URL de continuación no autorizada.");

			case "auth/user-not-found":
				throw new Error("Usuario no encontrado.");

			default:
				throw new Error(error.message || "Ocurrió un error desconocido.");
		}
	}
}
