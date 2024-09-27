// Libraries
import { z } from 'zod';

// Schemas
import { MediaSchema } from './Media';
import { UserSchema } from './User';
import { PostStatusSchema } from './PostStatus';
import { OrganizationSchema } from './Organization';
import { NewsTagSchema } from './NewsTag';

export const NewsAttributesSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  content: z.string(),
  author: z.object({
    data: z.object({
      id: z.number(),
      attributes: UserSchema,
    }),
  }),
  image: z.object({
    data: MediaSchema.partial(),
  }),
  status: PostStatusSchema,
  organization: z
    .object({
      data: OrganizationSchema,
    })
    .optional(),
  newsTags: z.object({
    data: z.array(NewsTagSchema),
  }),
});

export const NewsSchema = z.object({
  id: z.number(),
  attributes: NewsAttributesSchema,
});

export type News = z.infer<typeof NewsSchema>;
