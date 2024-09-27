// Schemas
import { UpdateUserDto } from '@/schemas';

export type TGetUserListArgs = {
  params?: Record<string, any>;
};

export type TUpdateUserArgs = {
  id: number;
  userData: UpdateUserDto;
};
