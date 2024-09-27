// Libraries
import { z } from 'zod';

export const PostStatusSchema = z.enum(['draft', 'published', 'archived']);

export type PostStatus = z.infer<typeof PostStatusSchema>;
