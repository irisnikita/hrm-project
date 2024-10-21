// Schemas
import { Organization } from '@/schemas';

export interface SignUpProps {
  organization?: Organization;
}

export type TFormValues = {
  identifier: string;
  password: string;
};
