import { z } from 'zod';

const ThumbnailFormatSchema = z.object({
  ext: z.string(),
  url: z.string(),
  hash: z.string(),
  mime: z.string(),
  name: z.string(),
  path: z.null(),
  size: z.number(),
  width: z.number(),
  height: z.number(),
  sizeInBytes: z.number(),
});

const FormatsSchema = z.object({
  thumbnail: ThumbnailFormatSchema,
});

const MediaAttributesSchema = z.object({
  name: z.string(),
  alternativeText: z.null(),
  caption: z.null(),
  width: z.number(),
  height: z.number(),
  formats: FormatsSchema,
  hash: z.string(),
  ext: z.string(),
  mime: z.string(),
  size: z.number(),
  url: z.string(),
  previewUrl: z.null(),
  provider: z.string(),
  provider_metadata: z.null(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const MediaSchema = z.object({
  id: z.number(),
  attributes: MediaAttributesSchema,
});

// Infer the TypeScript type from the Zod schema
export type Media = z.infer<typeof MediaSchema>;
