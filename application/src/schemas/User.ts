// Libraries
import { User as ClerkUser } from "@clerk/nextjs/server";
import { z } from "zod";

export const UserSchema = z.object({
  userId: z.string(),
  id: z.number(),
  username: z.string().nullable(),
  email: z.string(),
  provider: z.string().nullable(),
  confirmed: z.boolean(),
  blocked: z.boolean(),
  avatar: z.string(),
  role: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    type: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  fullName: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  primaryEmailAddress: z
    .object({
      id: z.string(),
      linkedTo: z.array(
        z.object({
          id: z.string(),
          type: z.string(),
          pathRoot: z.string(),
        })
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
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CreateUserDtoSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  role: true,
  provider: true,
}).and(
  z.object({
    password: z.string(),
    role: z.number(),
  })
);

export type User = z.infer<typeof UserSchema>;
export type CreateUserDto = Omit<
  z.infer<typeof CreateUserDtoSchema>,
  "primaryEmailAddress"
> & { primaryEmailAddress?: ClerkUser["primaryEmailAddress"] };
