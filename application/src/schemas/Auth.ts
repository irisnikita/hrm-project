// Libraries
import { z } from 'zod';

export const RegisterUserDtoSchema = z.object({
  username: z.string().min(3).max(32),
  email: z.string().email(),
  password: z.string(),
  organizations: z.array(z.number()).optional(),
});

export type RegisterUserDto = z.infer<typeof RegisterUserDtoSchema>;
