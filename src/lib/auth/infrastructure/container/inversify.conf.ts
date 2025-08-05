import { Container } from 'inversify';
import { CLIENT_AUTH_CONTAINER_TYPES } from './types';
import { FirebaseAuthService } from '../services/FirebaseAuthService';
import { SignInCase } from '../../application/SignInCase';
import { SignUpCase } from '../../application/SignUpCase';
import { ForgotPasswordCase } from '../../application/ForgotPasswordCase';
import { GetAllUsersCase } from '../../application/GetAllUsersCase';
import { CreateUserCase } from '../../application/CreateUserCase';
import { UpdateUserCase } from '../../application/UpdateUserCase';
import { UpdateUserRoleCase } from '../../application/UpdateUserRoleCase';
import { DeleteUserCase } from '../../application/DeleteUserCase';
import { SharedContainer } from '@/lib/shared/infrastructure/container/inversify.conf';

const ClientAuthContainer = new Container({ parent: SharedContainer });
ClientAuthContainer.bind(CLIENT_AUTH_CONTAINER_TYPES.FirebaseAuthService).to(FirebaseAuthService);
ClientAuthContainer.bind(CLIENT_AUTH_CONTAINER_TYPES.SignInCase).to(SignInCase);
ClientAuthContainer.bind(CLIENT_AUTH_CONTAINER_TYPES.SignUpCase).to(SignUpCase);
ClientAuthContainer.bind(CLIENT_AUTH_CONTAINER_TYPES.ForgotPasswordCase).to(ForgotPasswordCase);
ClientAuthContainer.bind<GetAllUsersCase>(CLIENT_AUTH_CONTAINER_TYPES.GetAllUsersCase).to(GetAllUsersCase);
ClientAuthContainer.bind<CreateUserCase>(CLIENT_AUTH_CONTAINER_TYPES.CreateUserCase).to(CreateUserCase);
ClientAuthContainer.bind<UpdateUserCase>(CLIENT_AUTH_CONTAINER_TYPES.UpdateUserCase).to(UpdateUserCase);
ClientAuthContainer.bind<UpdateUserRoleCase>(CLIENT_AUTH_CONTAINER_TYPES.UpdateUserRoleCase).to(UpdateUserRoleCase);
ClientAuthContainer.bind<DeleteUserCase>(CLIENT_AUTH_CONTAINER_TYPES.DeleteUserCase).to(DeleteUserCase);

export { ClientAuthContainer }; 