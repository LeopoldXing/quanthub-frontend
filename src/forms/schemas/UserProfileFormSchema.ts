import { z } from 'zod';

// define Zod schema
export const userProfileFormSchema = z.object({
  username: z.string().min(1, "username can't be blank").max(18, "username can not exceeds 18 characters"),
  password: z.string().min(6, "password must be between 6-18 characters").max(18, "password must be between 6-18 characters"),
  description: z.string().max(2000, "description can not exceed 2000 characters").optional(),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  role: z.string().optional()
});

// define form data type
export type UserProfileFormZodDataType = z.infer<typeof userProfileFormSchema>;
