// Constants
import { REGEX } from '@/constants';

// Types
import { TFormValues } from './types';

// Schemas
import { CreateUserDto, Organization } from '@/schemas';

export const handleFormatSignUpInfo = ({
  values,
  organization,
  roleId,
}: {
  values: TFormValues;
  organization?: Organization;
  roleId?: number;
}): CreateUserDto => {
  const { username, password } = values;
  const signupInfo: CreateUserDto = {
    username,
    password,
    organizations: [organization?.id || -1],
    role: roleId || -1,
  };

  if (REGEX.EMAIL.test(username)) {
    signupInfo.email = username;
  } else if (REGEX.PHONE.test(username)) {
    signupInfo.phoneNumber = username;
  }

  return signupInfo;
};
