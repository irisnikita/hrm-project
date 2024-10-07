// Libraries
import { z } from 'zod';
import { UserRoleTypeSchema } from './UserRole';

export const OrganizationRoleAttributesSchema = z.object({
  id: z.number().optional(),
  role: UserRoleTypeSchema,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  publishedAt: z.string().optional(),
  locale: z.string().optional(),
});

export const OrganizationRoleSchema = z.object({
  id: z.number(),
  attributes: OrganizationRoleAttributesSchema,
});

export type OrganizationRole = z.infer<typeof OrganizationRoleSchema>;
export type CreateOrganizationDto = {
  data: OrganizationRole['attributes'] & {
    organization: number;
    user: number;
  };
};
