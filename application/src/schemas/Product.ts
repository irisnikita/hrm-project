// Libraries
import { z } from 'zod';

export const ProductAttributesSchema = z.object({
  productName: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  points: z.number(),
});

export const ProductSchema = z.object({
  id: z.number(),
  attributes: ProductAttributesSchema.partial(),
});

export const CreateProductSchema = z.object({
  data: ProductAttributesSchema.partial().omit({}).and(z.object({})),
});

export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
