// Libraries
import merge from 'deepmerge';
import { omit } from 'lodash';

// Types
import { UserResource } from '@clerk/types';

// Schemas
import { User } from '@/schemas';

interface CombineUserInfoParams {
  clerkUser?: UserResource | null;
  systemUser: User;
}

export const combineUserInfo = ({
  clerkUser,
  systemUser,
}: CombineUserInfoParams): User & UserResource => {
  return merge(systemUser, omit(clerkUser, 'id') || {}) as User & UserResource;
};
