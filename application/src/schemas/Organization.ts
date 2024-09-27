// Libraries
import { z } from 'zod';

// Schemas
import { MediaSchema } from './Media';

export const OrganizationAttributesSchema = z.object({
  id: z.number().optional(),
  organizationName: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  website: z.string(),
  description: z.string(),
  logo: z.object({
    data: MediaSchema.partial(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  locale: z.string(),
  slug: z.string().optional(),
  owner: z.any(),
});

export const OrganizationSchema = z.object({
  id: z.number(),
  attributes: OrganizationAttributesSchema.partial(),
});

export const CreateOrganizationSchema = z.object({
  data: OrganizationAttributesSchema.partial()
    .omit({ logo: true, owner: true })
    .and(z.object({ logo: z.number().optional(), owner: z.number() })),
});

export type Organization = z.infer<typeof OrganizationSchema>;
export type CreateOrganization = z.infer<typeof CreateOrganizationSchema>;
