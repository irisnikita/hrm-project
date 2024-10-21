import { useMutation, UseMutationOptions } from '@tanstack/react-query';

// Types
import { authServices, SignInArgs, SignInResponse } from '@/services/auth';

interface UseSignInProps {
  options?: UseMutationOptions<SignInResponse, Error, SignInArgs>;
}

export const useSignIn = ({ options }: UseSignInProps = {}) => {
  return useMutation({
    mutationFn: authServices.signIn,
    ...options,
  });
};
