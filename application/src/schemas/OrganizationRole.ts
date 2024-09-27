// Libraries
import { z } from 'zod';
import { UserRoleTypeSchema } from './UserRole';

export const OrganizationRoleAttributesSchema = z.object({
  id: z.number().optional(),
  role: UserRoleTypeSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  locale: z.string(),
});

export const OrganizationRoleSchema = z.object({
  id: z.number(),
  attributes: OrganizationRoleAttributesSchema,
});

export type OrganizationRole = z.infer<typeof OrganizationRoleSchema>;
