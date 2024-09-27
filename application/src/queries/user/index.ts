// Libraries
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';

// Constants
import { QUERY_KEYS } from '@/constants';

// Services
import { type TGetUserListArgs, TUpdateUserArgs, userService } from '@/services';

// Schemas
import { User } from '@/schemas';

interface UseGetUserProps {
  args: TGetUserListArgs;
  options?: UseQueryOptions<User[], Error, User[], any[]>;
}

interface UseUpdateUserProps {
  options?: UseMutationOptions<User | null, Error, TUpdateUserArgs>;
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
