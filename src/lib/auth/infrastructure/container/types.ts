export const TYPES = {
  FirebaseService: Symbol.for('FirebaseService'),
};

export const CLIENT_AUTH_CONTAINER_TYPES = {
  FirebaseAuthService: Symbol.for('FirebaseAuthService'),
  SignInCase: Symbol.for('SignInCase'),
  SignUpCase: Symbol.for('SignUpCase'),
  ForgotPasswordCase: Symbol.for('ForgotPasswordCase'),
  GetAllUsersCase: Symbol.for('GetAllUsersCase'),
  CreateUserCase: Symbol.for('CreateUserCase'),
  UpdateUserCase: Symbol.for('UpdateUserCase'),
  UpdateUserRoleCase: Symbol.for('UpdateUserRoleCase'),
  DeleteUserCase: Symbol.for('DeleteUserCase'),
}; 