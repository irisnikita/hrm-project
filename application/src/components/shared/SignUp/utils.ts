// Constants
import { REGEX } from '@/constants';

// Types
import { TFormValues } from './types';

// Schemas
import { CreateUserDto, Organization } from '@/schemas';

const EMAIL_DEFAULT = 'invalid@gmail.com';

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
    role: roleId || -1,
  };

  // If organization exist then set organization
  if (organization) {
    signupInfo.organizations = [organization.id];
  }

  if (REGEX.EMAIL.test(username)) {
    signupInfo.email = username;
  } else if (REGEX.PHONE.test(username)) {
    signupInfo.phoneNumber = username;
  }

  // If Email not exist then set email default
  if (!signupInfo.email) {
    signupInfo.email = EMAIL_DEFAULT;
  }

  return signupInfo;
};
