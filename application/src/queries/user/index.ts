// Libraries
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { App } from 'antd';
import { useTranslations } from 'next-intl';

// Constants
import { QUERY_KEYS } from '@/constants';

// Services
import { type TGetUserListArgs, TUpdateUserArgs, userService } from '@/services';

// Schemas
import { CreateUserDto, User } from '@/schemas';

// Types
import { StrapiResponse } from '@/types';

interface UseGetUserProps {
  args: TGetUserListArgs;
  options?: UseQueryOptions<User[], Error, User[], any[]>;
}

interface UseUpdateUserProps {
  options?: UseMutationOptions<User | null, Error, TUpdateUserArgs>;
}

interface UseCreateUserProps {
  options?: UseMutationOptions<User | null, Error, CreateUserDto>;
}

interface UseRegisterUserProps {
  options?: UseMutationOptions<StrapiResponse<User>, Error, CreateUserDto>;
}

export const useGetUserList = (props?: UseGetUserProps) => {
  const { args, options } = props || {};

  return useQuery({
    queryKey: [QUERY_KEYS.USER_LIST, args],
    queryFn: () => userService.getUserList(args),
    ...options,
  });
};

export const useUpdateUser = (props?: UseUpdateUserProps) => {
  const queryClient = useQueryClient();
  const { options } = props || {};

  return useMutation({
    mutationFn: userService.updateUser,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_LIST], exact: false });
    },
    ...options,
  });
};

export const useCreateUser = (props?: UseCreateUserProps) => {
  const queryClient = useQueryClient();
  const { options } = props || {};

  return useMutation({
    mutationFn: userService.createUser,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_LIST], exact: false });
    },
    ...options,
  });
};

export const useRegisterUser = (props?: UseRegisterUserProps) => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const t = useTranslations();
  const { options } = props || {};

  return useMutation({
    mutationFn: userService.registerUser,
    onSettled: (data, error) => {
      const isError = !data?.data || error;

      message[isError ? 'error' : 'success'](
        !isError ? t('signUp.signUpSuccess') : (data?.error?.message ?? t('signUp.signUpError')),
      );
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_LIST], exact: false });
    },
    ...options,
  });
};
