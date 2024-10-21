import { z } from 'zod';

export const UserRoleTypeSchema = z.enum([
  'admin',
  'user',
  'authenticated',
  'employee',
  'manager',
  'customer',
]);

export type UserRoleType = z.infer<typeof UserRoleTypeSchema>;
