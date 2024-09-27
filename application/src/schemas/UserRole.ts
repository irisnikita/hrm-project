import { z } from 'zod';

export const UserRoleTypeSchema = z.enum(['admin', 'user', 'authenticated', 'employee', 'manager']);

export type UserRoleType = z.infer<typeof UserRoleTypeSchema>;
