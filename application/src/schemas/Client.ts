// Libraries
import { z } from 'zod';

export const ClientAttributesSchema = z.object({
  clientName: z.string(),
  address: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
});

export const ClientSchema = z.object({
  id: z.number(),
  attributes: ClientAttributesSchema.partial(),
});

export const CreateClientSchema = z.object({
  data: ClientAttributesSchema.partial().omit({}).and(z.object({})),
});

export type Client = z.infer<typeof ClientSchema>;
export type CreateClient = z.infer<typeof CreateClientSchema>;
