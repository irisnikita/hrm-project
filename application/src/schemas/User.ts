// Libraries
import { z } from 'zod';

// Schemas
import { OrganizationAttributesSchema } from './Organization';

export const UserSchema = z.object({
  userId: z.string(),
  id: z.number(),
  username: z.string().nullish(),
  email: z.string(),
  provider: z.string().nullish(),
  confirmed: z.boolean().nullish(),
  blocked: z.boolean().nullish(),
  avatar: z.string().nullish(),
  imageUrl: z.string().nullish(),
  role: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    type: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  fullName: z.string().nullish(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  organizations: z.array(OrganizationAttributesSchema),
  phoneNumber: z.string().nullish(),
  primaryEmailAddress: z
    .object({
      id: z.string(),
      linkedTo: z.array(
        z.object({
          id: z.string(),
          type: z.string(),
          pathRoot: z.string(),
        }),
      ),
      pathRoot: z.string(),
      emailAddress: z.string(),
      verification: z.object({
        error: z.string().nullable(),
        nonce: z.string().nullable(),
        status: z.string(),
        attempts: z.string().nullable(),
        expireAt: z.string(),
        pathRoot: z.string(),
        strategy: z.string(),
        externalVerificationRedirectURL: z.string().nullable(),
      }),
    })
    .optional(),
  createdAt: z.string().nullish(),
  updatedAt: z.string().nullish(),
});

export const CreateUserDtoSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  role: true,
  provider: true,
  organizations: true,
  userId: true,
  email: true,
}).and(
  z.object({
    userId: z.string().nullish(),
    password: z.string(),
    email: z.string().nullish(),
    role: z.number(),
    organizations: z.array(z.number()).optional(),
  }),
);

export const UpdateUserDtoSchema = CreateUserDtoSchema;

export type User = z.infer<typeof UserSchema>;
export type CreateUserDto = Omit<z.infer<typeof CreateUserDtoSchema>, 'primaryEmailAddress'> & {
  primaryEmailAddress?: Record<string, any>;
};
export type UpdateUserDto = Partial<
  Omit<z.infer<typeof UpdateUserDtoSchema>, 'primaryEmailAddress'> & {
    primaryEmailAddress?: Record<string, any>;
  }
>;
