import { useMutation } from '@tanstack/react-query';
import { ClientAuthContainer } from '@/lib/auth/infrastructure/container/inversify.conf';
import { CLIENT_AUTH_CONTAINER_TYPES } from '@/lib/auth/infrastructure/container/types';
import { SignInCase } from '@/lib/auth/application/SignInCase';
import { SignUpCase } from '@/lib/auth/application/SignUpCase';
import { ForgotPasswordCase } from '@/lib/auth/application/ForgotPasswordCase';

export function useAuthMutation() {
  const signInCase = ClientAuthContainer.get<SignInCase>(CLIENT_AUTH_CONTAINER_TYPES.SignInCase);
  const signUpCase = ClientAuthContainer.get<SignUpCase>(CLIENT_AUTH_CONTAINER_TYPES.SignUpCase);
  const forgotPasswordCase = ClientAuthContainer.get<ForgotPasswordCase>(CLIENT_AUTH_CONTAINER_TYPES.ForgotPasswordCase);

  const signIn = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return signInCase.execute(email, password);
    },
  });

  const signUp = useMutation({
    mutationFn: async ({ email, password, name, secretSignup }: { email: string; password: string; name: string; secretSignup: string }) => {
      return signUpCase.execute(email, password, name, secretSignup);
    },
  });

  const forgotPassword = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      return forgotPasswordCase.execute(email);
    },
  });

  return { signIn, signUp, forgotPassword };
} 