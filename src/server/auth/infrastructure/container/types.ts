export const AUTH_CONTAINER_TYPES = {
  UserRepository: Symbol.for('UserRepository'),
  AuthService: Symbol.for('AuthService'),
  ValidateFirebaseTokenCase: Symbol.for('ValidateFirebaseTokenCase'),
  FindUserByFirebaseUidCase: Symbol.for('FindUserByFirebaseUidCase'),
  CreateUserFromFirebaseCase: Symbol.for('CreateUserFromFirebaseCase'),
  GetUserCase: Symbol.for('GetUserCase'),
  SetRoleCase: Symbol.for('SetRoleCase'),
  CreateUserCase: Symbol.for('CreateUserCase'),
  GetAllUsersCase: Symbol.for('GetAllUsersCase'),
  UpdateUserCase: Symbol.for('UpdateUserCase'),
  UpdateUserRoleCase: Symbol.for('UpdateUserRoleCase'),
  DeleteUserCase: Symbol.for('DeleteUserCase'),
}; 