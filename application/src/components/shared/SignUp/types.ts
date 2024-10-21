// Schemas
import { Organization } from '@/schemas';

export interface SignUpProps {
  organization?: Organization;
}

export type TFormValues = {
  username: string;
  password: string;
  confirmPassword: string;
};
