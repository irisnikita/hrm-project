// Libraries
import { z } from 'zod';

// Schemas
import { ProductSchema } from './Product';
import { ClientSchema } from './Client';

export const QRCodeAttributesSchema = z.object({
  description: z.string(),
  points: z.number(),
  expiresAt: z.string(),
  status: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  locale: z.string(),
  qrCodeId: z.string().optional(),
  product: z.object({
    data: ProductSchema.partial(),
  }),
  client: z.object({
    data: ClientSchema.partial(),
  }),
});

export const QRCodeSchema = z.object({
  id: z.number(),
  attributes: QRCodeAttributesSchema.partial(),
});

export const CreateQRCodeSchema = z.object({
  data: QRCodeAttributesSchema.partial()
    .omit({
      product: true,
      client: true,
    })
    .and(
      z.object({
        product: z.number().optional(),
        client: z.number().optional(),
      }),
    ),
});

export type QRCode = z.infer<typeof QRCodeSchema>;
export type CreateQRCode = z.infer<typeof CreateQRCodeSchema>;
