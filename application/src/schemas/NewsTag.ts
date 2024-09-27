// Libraries
import { z } from 'zod';

// Schemas
import { OrganizationSchema } from './Organization';

export const NewsTagAttributesSchema = z.object({
  id: z.number().optional(),
  tagName: z.string(),
  color: z.string().optional(),
  organization: z
    .object({
      data: OrganizationSchema,
    })
    .optional(),
});

export const NewsTagSchema = z.object({
  id: z.number(),
  attributes: NewsTagAttributesSchema,
});

export type NewsTag = z.infer<typeof NewsTagSchema>;
