import { z } from 'zod';
import { SelectableCountries } from '../enums';

const SignupFormSchema = z
  .object({
    email: z.string().trim().email().toLowerCase(),
    password: z.string().trim().min(8),
    confirmPassword: z.string().min(8),
    firstName: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
    country: z
      .nativeEnum(...[SelectableCountries])
      .or(z.literal(''))
      .optional(),
    cellPhone: z.string().trim().optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export default SignupFormSchema;

export type SignUpForm = z.infer<typeof SignupFormSchema>;
