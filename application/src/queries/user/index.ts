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
import {
  TGetUserDetailArgs,
  type TGetUserListArgs,
  TUpdateUserArgs,
  userService,
} from '@/services';

// Schemas
import { CreateUserDto, User } from '@/schemas';

// Types
import { SingleStrapiResponse, StrapiResponse } from '@/types';

interface UseGetUserProps {
  args: TGetUserListArgs;
  options?: Partial<UseQueryOptions<User[], Error, User[], any[]>>;
}

interface UseUpdateUserProps {
  options?: UseMutationOptions<SingleStrapiResponse<User> | null, Error, TUpdateUserArgs>;
}

interface UseGetUserDetailProps {
  args: TGetUserDetailArgs;
  options?: UseQueryOptions<User | null, Error, User | null, any[]>;
}

interface UseCreateUserProps {
  options?: UseMutationOptions<SingleStrapiResponse<User> | null, Error, CreateUserDto>;
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

export const useGetUserDetail = (props?: UseGetUserDetailProps) => {
  const { args, options } = props || {};

  return useQuery({
    queryKey: [QUERY_KEYS.USER_DETAIL, args],
    queryFn: () => userService.getUser(args),
    enabled: !!args?.id,
    ...options,
  });
};

export const useUpdateUser = (props?: UseUpdateUserProps) => {
  const t = useTranslations();
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const { options } = props || {};

  return useMutation({
    mutationFn: userService.updateUser,
    onSettled: data => {
      const { error } = data || {};

      message[!!error ? 'error' : 'success'](
        !!error ? t('common.someThingWentWrong') : t('common.updatedSuccess'),
      );

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_LIST], exact: false });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_DETAIL], exact: false });
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
