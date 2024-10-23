// Types
import { User } from '@/schemas';

const requiredFields: Partial<keyof User>[] = ['fullName'];

export const checkIsMissingRequiredInfo = (user: User) => {
  if (user) {
    return requiredFields.some(field => !user[field]);
  }

  return false;
};
